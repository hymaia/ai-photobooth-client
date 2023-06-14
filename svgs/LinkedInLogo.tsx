import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const LinkedInLogo = (props: SvgProps) => (
  <Svg
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M50.65 10.159H13.348a3.19 3.19 0 0 0-3.189 3.189v37.304a3.19 3.19 0 0 0 3.19 3.19h37.304a3.164 3.164 0 0 0 3.189-3.19V13.348a3.164 3.164 0 0 0-3.19-3.19h-.002ZM22.91 47.463h-6.375V26.556h6.375v20.907Zm.54-27.615c-.042 2.03-1.741 3.603-3.726 3.56-2.111 0-3.767-1.74-3.726-3.767 0-2.07 1.74-3.725 3.766-3.684a3.685 3.685 0 0 1 3.685 3.766v.125Zm24.01 27.615h-6.374V36.45c0-3.353-1.863-4.76-3.685-4.76-2.236 0-4.513 1.49-4.513 4.844v10.93h-6.375V26.555h6.002v2.938h.082c.58-1.282 3.311-3.395 6.955-3.395s7.865 2.483 7.865 8.859V47.5l.041-.04.003.002Z"
    />
  </Svg>
);
export default LinkedInLogo;