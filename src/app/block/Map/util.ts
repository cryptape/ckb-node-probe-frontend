import { Data } from "@/interface/page";
import { message } from "antd";
import { isMobileDevice } from "@/app/utils";

export function renderMapGraph(data: Data[]) {
  const container = 'mapGraph';
  if (!document.getElementById(container)) return;

  let map: any;
  const _window = window as any;
  const L = _window.L;

  if (_window._map) map = _window._map;
  else {
    map = L.map(container).setView([0, 0], 2);
    _window._map = map;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png').addTo(map);
  }

  if (!data.length) return;

  document.querySelectorAll('.leaflet-control-zoom,.leaflet-control-zoom-fullscreen,.move-control').forEach(target => target.remove());
  document.querySelector(".leaflet-heatmap-layer")?.remove();
  const markerTarget = document.querySelector('.leaflet-marker-pane');
  if (markerTarget) markerTarget.innerHTML = '';

  map.removeControl(L.control.zoom());
  map.removeControl(L.control.fullscreen());
  map.addControl(L.control.zoom({ position: 'bottomright' }));
  map.addControl(L.control.fullscreen({ position: 'topright' }));

  const heatMapData = [] as object[];
  data.forEach(({ latitude, longitude }) => {
    if (latitude === null && longitude === null) return;
    heatMapData.push([latitude, longitude, 5000]);
  })

  L.heatLayer(heatMapData, { radius: 15 }).addTo(map);
  

  if (isMobileDevice()) {
    const moveControl = L.control();
    moveControl.setPosition('bottomright');

    moveControl.onAdd = () => {
      const lockIcon = 'lock-icon';
      const unLockIcon = 'unlock-icon';
      const container = L.DomUtil.create('div', 'move-control');

      container.innerHTML = `<span class="${lockIcon}"></span>`;
      container.style.cursor = 'pointer';

      L.DomEvent.on(container, 'touchstart', (event: Event) => {
        const target = document.querySelector('.move-control>span');
        if(!target) return;

        let newClass = lockIcon;
        let messageContent = "Locked successfully!";

        if (target.className === lockIcon) {
          map.dragging.enable();
          newClass = unLockIcon;
          messageContent = "Unlocked, you can drag and move the map!";
        } else map.dragging.disable();
        
        target.setAttribute('class', newClass);
        message.success(messageContent);
      });

      return container;
    };
    moveControl.addTo(map);
  }

  map.dragging.disable();
}
