import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const YouTubeLogo = (props: SvgProps) => (
  <Svg
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M55.927 19.634a6.371 6.371 0 0 0-4.515-4.552C47.45 14 31.5 14 31.5 14s-15.917 0-19.912 1.082a6.375 6.375 0 0 0-4.515 4.552C6 23.631 6 32.017 6 32.017s0 8.354 1.073 12.349a6.371 6.371 0 0 0 4.515 4.552C15.55 50 31.5 50 31.5 50s15.917 0 19.912-1.082a6.375 6.375 0 0 0 4.515-4.552C57 40.369 57 32.017 57 32.017s0-8.353-1.073-12.383Zm-29.495 20.08V24.319l13.22 7.698-13.22 7.699v-.002Z"
    />
  </Svg>
);
export default YouTubeLogo;
