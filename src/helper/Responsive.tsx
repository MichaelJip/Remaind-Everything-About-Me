import { PixelRatio } from "react-native";

const fontScale = PixelRatio.getFontScale();
export const Responsive = (size: any) => size / fontScale;
