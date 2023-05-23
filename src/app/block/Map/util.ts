import { Data } from "@/interface/page";

export function renderMapGraph(data: Data[]) {
  const container = 'mapGraph';
  if (!document.getElementById(container)) return;

  let map;
  const _window = window as any;
  const L = _window.L;

  if (_window._map) map = _window._map;
  else {
    map = L.map(container).setView([0, 0], 2);
    _window._map = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png').addTo(map);
  }

  if (!data.length) return;

  document.querySelectorAll('.leaflet-control-zoom,.leaflet-control-zoom-fullscreen').forEach(target => target.remove());
  const markerTarget = document.querySelector('.leaflet-marker-pane');
  if (markerTarget) markerTarget.innerHTML = '';

  map.removeControl(L.control.zoom());
  map.removeControl(L.control.fullscreen());
  map.addControl(L.control.zoom({ position: 'bottomright' }));
  map.addControl(L.control.fullscreen({ position: 'topright' }));

  const markers = L.markerClusterGroup();
  data.forEach(({ city, latitude, longitude }) => {
    const marker = L.marker(new L.LatLng(latitude, longitude), { title: city });
    marker.bindPopup(city);
    markers.addLayer(marker);
  });
  map.addLayer(markers);
}
