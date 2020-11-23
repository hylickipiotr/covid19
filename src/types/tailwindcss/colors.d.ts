declare module "tailwindcss/colors" {
  import colors from "./colors";
  export type ColorName =
    | "rose"
    | "pink"
    | "fuchsia"
    | "purple"
    | "violet"
    | "indigo"
    | "blue"
    | "lightBlue"
    | "cyan"
    | "teal"
    | "emerald"
    | "green"
    | "lime"
    | "yellow"
    | "amber"
    | "orange"
    | "red"
    | "warmGray"
    | "trueGray"
    | "gray"
    | "coolGray"
    | "blueGray";

  export type ColorShade =
    | 50
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900;

  type ColorValue = string;
  type Color = Record<ColorShade, ColorValue>;

  // export type Colors =
  //   | Record<"black" | "white", string>
  //   | Record<ColorName, Color>;

  export type Colors = {
    white: ColorValue;
    black: ColorValue;
    rose: Color;
    pink: Color;
    fuchsia: Color;
    purple: Color;
    violet: Color;
    indigo: Color;
    blue: Color;
    lightBlue: Color;
    cyan: Color;
    teal: Color;
    emerald: Color;
    green: Color;
    lime: Color;
    yellow: Color;
    amber: Color;
    orange: Color;
    red: Color;
    warmGray: Color;
    trueGray: Color;
    gray: Color;
    coolGray: Color;
    blueGray: Color;
  };

  export default colors as Colors;
}
