"use client";
import { Data } from "@/interface/page";
import { renderMapGraph } from "./util";
import { useState, useEffect } from "react";
import styles from './index.module.scss';
import Quote from "@/app/components/Quote/Quote";
import {Skeleton} from "antd";
interface MapProps {
  data: Data[]
}
const Map: React.FC<MapProps> = ({ data }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        renderMapGraph(data);
        setLoading(false);

  }, [data]);

  return (
    <>
        {loading ? <Skeleton
            active
            paragraph={{ rows: 0 }}
            style={{ minHeight: '500px'}}/> : <div id="mapGraph" className={styles.mapGraph}>
          <div className={styles.reportContainer}>
              <div className={styles.svgItemLeft}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3.5979 8.04909L13.7306 18.1818H3.637C3.15478 18.1818 2.69232 17.9903 2.35135 17.6493C2.01037 17.3083 1.81881 16.8458 1.81881 16.3636L1.81836 9.82863L3.5979 8.04909ZM11.107 1.81818C10.6138 2.28129 10.2208 2.84063 9.95234 3.46162C9.68386 4.08262 9.5456 4.75208 9.54609 5.42863C9.54609 6.74954 10.0629 7.94954 10.9079 8.83999L11.0111 8.94545L14.2238 12.1409C14.3875 12.3036 14.6465 12.3159 14.8252 12.1782L14.8679 12.1409L18.0806 8.94409C18.1152 8.90999 18.1488 8.87545 18.1825 8.83999V16.3636C18.1825 16.6024 18.1354 16.8388 18.0441 17.0594C17.9527 17.28 17.8188 17.4804 17.6499 17.6493C17.4811 17.8181 17.2807 17.952 17.0601 18.0434C16.8395 18.1348 16.603 18.1818 16.3643 18.1818H15.6597L4.56245 7.08454L9.82881 1.81818H11.1075H11.107ZM14.5461 1.81818C16.5534 1.81818 18.1825 3.53045 18.1825 5.64363C18.1825 6.70045 17.7756 7.65636 17.1165 8.34863L14.7802 10.8077C14.7502 10.8398 14.714 10.8654 14.6737 10.8828C14.6334 10.9003 14.59 10.9093 14.5461 10.9093C14.5022 10.9093 14.4588 10.9003 14.4185 10.8828C14.3782 10.8654 14.342 10.8398 14.312 10.8077L11.9752 8.34954C11.3161 7.65727 10.9093 6.70136 10.9093 5.64454C10.9093 3.53136 12.5384 1.81818 14.5456 1.81818H14.5461ZM7.90018 1.81818L1.81836 7.89954V3.63636C1.81836 3.15415 2.00992 2.69168 2.35089 2.35071C2.69187 2.00973 3.15433 1.81818 3.63654 1.81818H7.90018ZM14.5456 3.63636C14.0634 3.63636 13.601 3.82792 13.26 4.16889C12.919 4.50987 12.7275 4.97233 12.7275 5.45454C12.7275 5.93675 12.919 6.39921 13.26 6.74019C13.601 7.08116 14.0634 7.27272 14.5456 7.27272C15.0278 7.27272 15.4903 7.08116 15.8313 6.74019C16.1723 6.39921 16.3638 5.93675 16.3638 5.45454C16.3638 4.97233 16.1723 4.50987 15.8313 4.16889C15.4903 3.82792 15.0278 3.63636 14.5456 3.63636Z" fill="white"/>
                      <path d="M3.5979 8.04909L13.7306 18.1818H3.637C3.15478 18.1818 2.69232 17.9903 2.35135 17.6493C2.01037 17.3083 1.81881 16.8458 1.81881 16.3636L1.81836 9.82863L3.5979 8.04909ZM11.107 1.81818C10.6138 2.28129 10.2208 2.84063 9.95234 3.46162C9.68386 4.08262 9.5456 4.75208 9.54609 5.42863C9.54609 6.74954 10.0629 7.94954 10.9079 8.83999L11.0111 8.94545L14.2238 12.1409C14.3875 12.3036 14.6465 12.3159 14.8252 12.1782L14.8679 12.1409L18.0806 8.94409C18.1152 8.90999 18.1488 8.87545 18.1825 8.83999V16.3636C18.1825 16.6024 18.1354 16.8388 18.0441 17.0594C17.9527 17.28 17.8188 17.4804 17.6499 17.6493C17.4811 17.8181 17.2807 17.952 17.0601 18.0434C16.8395 18.1348 16.603 18.1818 16.3643 18.1818H15.6597L4.56245 7.08454L9.82881 1.81818H11.1075H11.107ZM14.5461 1.81818C16.5534 1.81818 18.1825 3.53045 18.1825 5.64363C18.1825 6.70045 17.7756 7.65636 17.1165 8.34863L14.7802 10.8077C14.7502 10.8398 14.714 10.8654 14.6737 10.8828C14.6334 10.9003 14.59 10.9093 14.5461 10.9093C14.5022 10.9093 14.4588 10.9003 14.4185 10.8828C14.3782 10.8654 14.342 10.8398 14.312 10.8077L11.9752 8.34954C11.3161 7.65727 10.9093 6.70136 10.9093 5.64454C10.9093 3.53136 12.5384 1.81818 14.5456 1.81818H14.5461ZM7.90018 1.81818L1.81836 7.89954V3.63636C1.81836 3.15415 2.00992 2.69168 2.35089 2.35071C2.69187 2.00973 3.15433 1.81818 3.63654 1.81818H7.90018ZM14.5456 3.63636C14.0634 3.63636 13.601 3.82792 13.26 4.16889C12.919 4.50987 12.7275 4.97233 12.7275 5.45454C12.7275 5.93675 12.919 6.39921 13.26 6.74019C13.601 7.08116 14.0634 7.27272 14.5456 7.27272C15.0278 7.27272 15.4903 7.08116 15.8313 6.74019C16.1723 6.39921 16.3638 5.93675 16.3638 5.45454C16.3638 4.97233 16.1723 4.50987 15.8313 4.16889C15.4903 3.82792 15.0278 3.63636 14.5456 3.63636Z" fill="url(#paint0_linear_391_3)"/>
                      <defs>
                          <linearGradient id="paint0_linear_391_3" x1="18.6555" y1="18.1819" x2="1.51748" y2="18.0668" gradientUnits="userSpaceOnUse">
                              <stop offset="0.120652" stop-color="#0FF082"/>
                              <stop offset="0.961475" stop-color="#00AEFC"/>
                          </linearGradient>
                      </defs>
                  </svg>
              </div>
              <div>
                  Don’t see your node on the map? <a target="_blank" href="https://cryptape.notion.site/How-to-Find-Your-CKB-Node-ID-5ce430154e184723928afd4e265f6a23?pvs=4">Help us count you in!</a>
              </div>
              <a className={styles.svgItemRight} target="_blank" href="https://cryptape.notion.site/How-to-Find-Your-CKB-Node-ID-5ce430154e184723928afd4e265f6a23?pvs=4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2883 16.2852C13.4215 16.4205 13.5977 16.4871 13.7739 16.4871C13.95 16.4871 14.1262 16.4205 14.2616 16.2852L19.0526 11.4834C19.3211 11.2148 19.3211 10.7809 19.0526 10.5123L14.2616 5.71269C13.993 5.44414 13.5569 5.44414 13.2883 5.71269C13.0198 5.98125 13.0198 6.41738 13.2883 6.68593L16.9291 10.334H8.96973C8.58945 10.334 8.28223 10.6412 8.28223 11.0215C8.28223 11.4018 8.58945 11.709 8.96973 11.709H16.8859L13.2883 15.3119C13.0198 15.5826 13.0198 16.0166 13.2883 16.2852ZM2.76074 11C2.76074 11.1823 2.83318 11.3572 2.96211 11.4861C3.09104 11.6151 3.26591 11.6875 3.44824 11.6875C3.63058 11.6875 3.80545 11.6151 3.93438 11.4861C4.06331 11.3572 4.13574 11.1823 4.13574 11C4.13574 10.8177 4.06331 10.6428 3.93438 10.5139C3.80545 10.3849 3.63058 10.3125 3.44824 10.3125C3.26591 10.3125 3.09104 10.3849 2.96211 10.5139C2.83318 10.6428 2.76074 10.8177 2.76074 11ZM5.71211 11.4861C5.58318 11.3572 5.51074 11.1823 5.51074 11C5.51074 10.8177 5.58318 10.6428 5.71211 10.5139C5.84104 10.3849 6.01591 10.3125 6.19824 10.3125C6.38058 10.3125 6.55545 10.3849 6.68438 10.5139C6.81331 10.6428 6.88574 10.8177 6.88574 11C6.88574 11.1823 6.81331 11.3572 6.68438 11.4861C6.55545 11.6151 6.38058 11.6875 6.19824 11.6875C6.01591 11.6875 5.84104 11.6151 5.71211 11.4861Z" fill="#00AEFC"/>
                  </svg>
              </a>
          </div>
          <div className={styles.mobileReportContainer}>
              <div className={styles.svgItemLeft}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4.3171 9.65891L16.4764 21.8182H4.364C3.78535 21.8182 3.2304 21.5883 2.82123 21.1791C2.41206 20.77 2.18219 20.215 2.18219 19.6364L2.18164 11.7944L4.3171 9.65891ZM13.328 2.18182C12.7362 2.73755 12.2646 3.40876 11.9424 4.15395C11.6202 4.89915 11.4543 5.7025 11.4549 6.51436C11.4549 8.09945 12.0751 9.53945 13.0891 10.608L13.2129 10.7345L17.0682 14.5691C17.2646 14.7644 17.5755 14.7791 17.7898 14.6138L17.8411 14.5691L21.6964 10.7329C21.7378 10.692 21.7782 10.6505 21.8186 10.608V19.6364C21.8186 19.9229 21.7621 20.2066 21.6525 20.4713C21.5428 20.736 21.3821 20.9765 21.1795 21.1791C20.9769 21.3817 20.7364 21.5424 20.4717 21.6521C20.207 21.7617 19.9233 21.8182 19.6367 21.8182H18.7913L5.47455 8.50145L11.7942 2.18182H13.3286H13.328ZM17.4549 2.18182C19.8636 2.18182 21.8186 4.23654 21.8186 6.77236C21.8186 8.04054 21.3304 9.18763 20.5395 10.0184L17.7358 12.9693C17.6999 13.0078 17.6564 13.0384 17.608 13.0594C17.5597 13.0804 17.5076 13.0912 17.4549 13.0912C17.4022 13.0912 17.3501 13.0804 17.3018 13.0594C17.2535 13.0384 17.21 13.0078 17.174 12.9693L14.3698 10.0195C13.5789 9.18872 13.0907 8.04163 13.0907 6.77345C13.0907 4.23763 15.0456 2.18182 17.4544 2.18182H17.4549ZM9.47982 2.18182L2.18164 9.47945V4.36363C2.18164 3.78498 2.41151 3.23003 2.82068 2.82086C3.22985 2.41169 3.7848 2.18182 4.36346 2.18182H9.47982ZM17.4544 4.36363C16.8757 4.36363 16.3208 4.5935 15.9116 5.00267C15.5024 5.41184 15.2725 5.9668 15.2725 6.54545C15.2725 7.12411 15.5024 7.67906 15.9116 8.08823C16.3208 8.4974 16.8757 8.72727 17.4544 8.72727C18.033 8.72727 18.588 8.4974 18.9971 8.08823C19.4063 7.67906 19.6362 7.12411 19.6362 6.54545C19.6362 5.9668 19.4063 5.41184 18.9971 5.00267C18.588 4.5935 18.033 4.36363 17.4544 4.36363Z" fill="white"/>
                      <path d="M4.3171 9.65891L16.4764 21.8182H4.364C3.78535 21.8182 3.2304 21.5883 2.82123 21.1791C2.41206 20.77 2.18219 20.215 2.18219 19.6364L2.18164 11.7944L4.3171 9.65891ZM13.328 2.18182C12.7362 2.73755 12.2646 3.40876 11.9424 4.15395C11.6202 4.89915 11.4543 5.7025 11.4549 6.51436C11.4549 8.09945 12.0751 9.53945 13.0891 10.608L13.2129 10.7345L17.0682 14.5691C17.2646 14.7644 17.5755 14.7791 17.7898 14.6138L17.8411 14.5691L21.6964 10.7329C21.7378 10.692 21.7782 10.6505 21.8186 10.608V19.6364C21.8186 19.9229 21.7621 20.2066 21.6525 20.4713C21.5428 20.736 21.3821 20.9765 21.1795 21.1791C20.9769 21.3817 20.7364 21.5424 20.4717 21.6521C20.207 21.7617 19.9233 21.8182 19.6367 21.8182H18.7913L5.47455 8.50145L11.7942 2.18182H13.3286H13.328ZM17.4549 2.18182C19.8636 2.18182 21.8186 4.23654 21.8186 6.77236C21.8186 8.04054 21.3304 9.18763 20.5395 10.0184L17.7358 12.9693C17.6999 13.0078 17.6564 13.0384 17.608 13.0594C17.5597 13.0804 17.5076 13.0912 17.4549 13.0912C17.4022 13.0912 17.3501 13.0804 17.3018 13.0594C17.2535 13.0384 17.21 13.0078 17.174 12.9693L14.3698 10.0195C13.5789 9.18872 13.0907 8.04163 13.0907 6.77345C13.0907 4.23763 15.0456 2.18182 17.4544 2.18182H17.4549ZM9.47982 2.18182L2.18164 9.47945V4.36363C2.18164 3.78498 2.41151 3.23003 2.82068 2.82086C3.22985 2.41169 3.7848 2.18182 4.36346 2.18182H9.47982ZM17.4544 4.36363C16.8757 4.36363 16.3208 4.5935 15.9116 5.00267C15.5024 5.41184 15.2725 5.9668 15.2725 6.54545C15.2725 7.12411 15.5024 7.67906 15.9116 8.08823C16.3208 8.4974 16.8757 8.72727 17.4544 8.72727C18.033 8.72727 18.588 8.4974 18.9971 8.08823C19.4063 7.67906 19.6362 7.12411 19.6362 6.54545C19.6362 5.9668 19.4063 5.41184 18.9971 5.00267C18.588 4.5935 18.033 4.36363 17.4544 4.36363Z" fill="url(#paint0_linear_394_145)"/>
                      <defs>
                          <linearGradient id="paint0_linear_394_145" x1="22.3862" y1="21.8183" x2="1.82058" y2="21.6802" gradientUnits="userSpaceOnUse">
                              <stop offset="0.120652" stop-color="#0FF082"/>
                              <stop offset="0.961475" stop-color="#00AEFC"/>
                          </linearGradient>
                      </defs>
                  </svg>
              </div>
              <div>
                  Don’t see your node on the map?
                  <a target="_blank" href="https://cryptape.notion.site/How-to-Find-Your-CKB-Node-ID-5ce430154e184723928afd4e265f6a23?pvs=4">
                      Help us count you in!
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2883 16.2852C13.4215 16.4205 13.5977 16.4871 13.7739 16.4871C13.95 16.4871 14.1262 16.4205 14.2616 16.2852L19.0526 11.4834C19.3211 11.2148 19.3211 10.7809 19.0526 10.5123L14.2616 5.71269C13.993 5.44414 13.5569 5.44414 13.2883 5.71269C13.0198 5.98125 13.0198 6.41738 13.2883 6.68593L16.9291 10.334H8.96973C8.58945 10.334 8.28223 10.6412 8.28223 11.0215C8.28223 11.4018 8.58945 11.709 8.96973 11.709H16.8859L13.2883 15.3119C13.0198 15.5826 13.0198 16.0166 13.2883 16.2852ZM2.76074 11C2.76074 11.1823 2.83318 11.3572 2.96211 11.4861C3.09104 11.6151 3.26591 11.6875 3.44824 11.6875C3.63058 11.6875 3.80545 11.6151 3.93438 11.4861C4.06331 11.3572 4.13574 11.1823 4.13574 11C4.13574 10.8177 4.06331 10.6428 3.93438 10.5139C3.80545 10.3849 3.63058 10.3125 3.44824 10.3125C3.26591 10.3125 3.09104 10.3849 2.96211 10.5139C2.83318 10.6428 2.76074 10.8177 2.76074 11ZM5.71211 11.4861C5.58318 11.3572 5.51074 11.1823 5.51074 11C5.51074 10.8177 5.58318 10.6428 5.71211 10.5139C5.84104 10.3849 6.01591 10.3125 6.19824 10.3125C6.38058 10.3125 6.55545 10.3849 6.68438 10.5139C6.81331 10.6428 6.88574 10.8177 6.88574 11C6.88574 11.1823 6.81331 11.3572 6.68438 11.4861C6.55545 11.6151 6.38058 11.6875 6.19824 11.6875C6.01591 11.6875 5.84104 11.6151 5.71211 11.4861Z" fill="#00AEFC"/>
                  </svg></a>

              </div>

          </div>
      </div>}
      <Quote />
    </>
  )
}

export default Map;
