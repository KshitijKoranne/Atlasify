import { useState } from "react";
import {
  DEFAULT_CITY,
  DEFAULT_COUNTRY,
  DEFAULT_DISTANCE_METERS,
  DEFAULT_LAT,
  DEFAULT_LON,
} from "@/core/config";
import { geocodeLocation, reverseGeocodeCoordinates } from "@/core/services";
import { GEOLOCATION_TIMEOUT_MS } from "@/features/map/infrastructure";
import {
  getGeolocationFailureMessage,
  requestCurrentPositionWithRetry,
} from "@/features/location/infrastructure";
import { MyLocationIcon } from "@/shared/ui/Icons";
import { usePosterDispatch } from "@/features/poster/ui/PosterContext";
import { useLocationAutocomplete } from "@/features/location/application/useLocationAutocomplete";
import type { SearchResult } from "@/features/location/domain/types";

const CLOSE_ANIMATION_MS = 220;
const DEFAULT_LOCATION_LABEL = "Vadodara, Gujarat, India";

type InputMode = "search" | "coords";

interface PendingLocation {
  label: string;
  lat: number;
  lon: number;
  city: string;
  country: string;
  continent: string;
}

export default function StartupLocationModal() {
  const { dispatch } = usePosterDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [mode, setMode] = useState<InputMode>("search");

  // Search mode state
  const [locationInput, setLocationInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<PendingLocation | null>(null);

  // Coords mode state
  const [latInput, setLatInput] = useState("");
  const [lonInput, setLonInput] = useState("");

  const [isResolving, setIsResolving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { locationSuggestions, isLocationSearching, clearLocationSuggestions, searchNow } =
    useLocationAutocomplete(locationInput, isInputFocused);

  const showSuggestions = isInputFocused && locationSuggestions.length > 0;

  const closeModal = () => {
    setIsClosing(true);
    window.setTimeout(() => setIsOpen(false), CLOSE_ANIMATION_MS);
  };

  const applyResolvedLocation = (location: PendingLocation | null) => {
    if (!location) {
      dispatch({ type: "SET_USER_LOCATION", location: null });
      dispatch({
        type: "SET_FORM_FIELDS",
        resetDisplayNameOverrides: true,
        fields: {
          location: DEFAULT_LOCATION_LABEL,
          latitude: DEFAULT_LAT.toFixed(6),
          longitude: DEFAULT_LON.toFixed(6),
          distance: String(DEFAULT_DISTANCE_METERS),
          displayCity: DEFAULT_CITY,
          displayCountry: DEFAULT_COUNTRY,
          displayContinent: "Europe",
        },
      });
      return;
    }
    dispatch({
      type: "SET_FORM_FIELDS",
      resetDisplayNameOverrides: true,
      fields: {
        location: location.label,
        latitude: location.lat.toFixed(6),
        longitude: location.lon.toFixed(6),
        distance: String(DEFAULT_DISTANCE_METERS),
        displayCity: location.city,
        displayCountry: location.country,
        displayContinent: location.continent,
      },
    });
    dispatch({
      type: "SET_USER_LOCATION",
      location: {
        id: `startup:${location.lat.toFixed(6)},${location.lon.toFixed(6)}`,
        label: location.label,
        city: location.city,
        country: location.country,
        continent: location.continent,
        lat: location.lat,
        lon: location.lon,
      },
    });
  };

  const handleUseMyLocation = () => {
    if (isResolving) return;
    setIsResolving(true);
    setErrorMessage("");
    void (async () => {
      const positionResult = await requestCurrentPositionWithRetry({
        timeoutMs: GEOLOCATION_TIMEOUT_MS,
        maxAttempts: 2,
      });
      if (!positionResult.ok) {
        setErrorMessage(getGeolocationFailureMessage(positionResult.reason, { includeManualFallback: true }));
        setIsResolving(false);
        return;
      }
      const { lat, lon } = positionResult;
      try {
        const resolved = await reverseGeocodeCoordinates(lat, lon);
        const pending: PendingLocation = {
          label: String(resolved.label ?? "").trim() || `${lat.toFixed(6)}, ${lon.toFixed(6)}`,
          lat, lon,
          city: String(resolved.city ?? "").trim(),
          country: String(resolved.country ?? "").trim(),
          continent: String(resolved.continent ?? "").trim(),
        };
        setPendingLocation(pending);
        setLocationInput(pending.label);
      } catch {
        const label = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
        setPendingLocation({ label, lat, lon, city: "", country: "", continent: "" });
        setLocationInput(label);
      } finally {
        setIsResolving(false);
      }
    })();
  };

  const onSuggestionSelect = (suggestion: SearchResult) => {
    setPendingLocation({
      label: suggestion.label,
      lat: suggestion.lat,
      lon: suggestion.lon,
      city: suggestion.city,
      country: suggestion.country,
      continent: String(suggestion.continent ?? "").trim(),
    });
    setLocationInput(suggestion.label);
    setIsInputFocused(false);
    clearLocationSuggestions();
  };

  const handleConfirmSearch = async () => {
    if (isResolving) return;
    setIsResolving(true);
    setErrorMessage("");
    const query = locationInput.trim();
    if (!query) {
      applyResolvedLocation(null);
      closeModal();
      setIsResolving(false);
      return;
    }
    if (pendingLocation && pendingLocation.label === query) {
      applyResolvedLocation(pendingLocation);
      closeModal();
      setIsResolving(false);
      return;
    }
    try {
      const resolved = await geocodeLocation(query);
      applyResolvedLocation({
        label: resolved.label,
        lat: resolved.lat,
        lon: resolved.lon,
        city: resolved.city,
        country: resolved.country,
        continent: String(resolved.continent ?? "").trim(),
      });
      closeModal();
    } catch {
      setErrorMessage("Could not resolve that location. Try another name.");
    } finally {
      setIsResolving(false);
    }
  };

  const handleConfirmCoords = async () => {
    if (isResolving) return;
    const lat = parseFloat(latInput.trim());
    const lon = parseFloat(lonInput.trim());
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setErrorMessage("Enter valid coordinates. Latitude: -90 to 90, Longitude: -180 to 180.");
      return;
    }
    setIsResolving(true);
    setErrorMessage("");
    try {
      const resolved = await reverseGeocodeCoordinates(lat, lon);
      applyResolvedLocation({
        label: String(resolved.label ?? "").trim() || `${lat.toFixed(6)}, ${lon.toFixed(6)}`,
        lat, lon,
        city: String(resolved.city ?? "").trim(),
        country: String(resolved.country ?? "").trim(),
        continent: String(resolved.continent ?? "").trim(),
      });
      closeModal();
    } catch {
      // Apply with coords as label even if reverse geocode fails
      applyResolvedLocation({
        label: `${lat.toFixed(6)}, ${lon.toFixed(6)}`,
        lat, lon, city: "", country: "", continent: "",
      });
      closeModal();
    } finally {
      setIsResolving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`startup-location-modal${isClosing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="startup-location-title"
    >
      <div className="startup-location-logo-wrap" aria-hidden="true">
        <img className="startup-location-logo" src="/assets/logo.svg" alt="" />
        <p className="startup-location-app-name">Atlasify</p>
      </div>

      <div className="startup-location-card is-visible">
        <p className="startup-location-title" id="startup-location-title">
          Choose Location
        </p>

        {/* Mode toggle */}
        <div className="startup-location-mode-tabs">
          <button
            type="button"
            className={`startup-location-mode-tab${mode === "search" ? " is-active" : ""}`}
            onClick={() => { setMode("search"); setErrorMessage(""); }}
          >
            Search
          </button>
          <button
            type="button"
            className={`startup-location-mode-tab${mode === "coords" ? " is-active" : ""}`}
            onClick={() => { setMode("coords"); setErrorMessage(""); }}
          >
            Coordinates
          </button>
        </div>

        {mode === "search" ? (
          <>
            <input
              type="text"
              className="startup-location-input"
              value={locationInput}
              onChange={(e) => {
                setLocationInput(e.target.value);
                setPendingLocation(null);
                if (!isInputFocused) setIsInputFocused(true);
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setTimeout(() => setIsInputFocused(false), 120)}
              onKeyDown={(e) => { if (e.key === "Enter") void searchNow(e.currentTarget.value); }}
              placeholder="Type a city or place"
              autoComplete="off"
            />
            {showSuggestions ? (
              <ul className="startup-location-suggestions" role="listbox">
                {locationSuggestions.map((suggestion) => (
                  <li key={suggestion.id}>
                    <button
                      type="button"
                      className="startup-location-suggestion"
                      onMouseDown={(e) => { e.preventDefault(); onSuggestionSelect(suggestion); }}
                    >
                      {suggestion.label}
                    </button>
                  </li>
                ))}
                {isLocationSearching ? (
                  <li className="startup-location-suggestion-status">Searching...</li>
                ) : null}
              </ul>
            ) : null}
            <button
              type="button"
              className="startup-location-action startup-location-action--geo"
              onClick={handleUseMyLocation}
              disabled={isResolving}
            >
              <MyLocationIcon />
              <span>{isResolving ? "Locating..." : "Get my location"}</span>
            </button>
            <button
              type="button"
              className="startup-location-action startup-location-action--confirm"
              onClick={() => void handleConfirmSearch()}
              disabled={isResolving}
            >
              OK
            </button>
          </>
        ) : (
          <>
            <div className="startup-location-coords-row">
              <div className="startup-location-coord-field">
                <label className="startup-location-coord-label">Latitude</label>
                <input
                  type="number"
                  className="startup-location-input startup-location-input--coord"
                  value={latInput}
                  onChange={(e) => setLatInput(e.target.value)}
                  placeholder="e.g. 19.0760"
                  min="-90"
                  max="90"
                  step="any"
                />
              </div>
              <div className="startup-location-coord-field">
                <label className="startup-location-coord-label">Longitude</label>
                <input
                  type="number"
                  className="startup-location-input startup-location-input--coord"
                  value={lonInput}
                  onChange={(e) => setLonInput(e.target.value)}
                  placeholder="e.g. 72.8777"
                  min="-180"
                  max="180"
                  step="any"
                />
              </div>
            </div>
            <button
              type="button"
              className="startup-location-action startup-location-action--confirm"
              onClick={() => void handleConfirmCoords()}
              disabled={isResolving}
            >
              {isResolving ? "Resolving..." : "Go"}
            </button>
          </>
        )}

        {errorMessage ? (
          <p className="startup-location-error" role="status">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
