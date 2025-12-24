import type { TabScreen, StackScreen } from "../types";

export class NavigationValidator {
  static validateScreens(screens: TabScreen[] | StackScreen[], type: "tab" | "stack"): void {
    if (!Array.isArray(screens)) {
      throw new Error(`Screens must be an array for ${type} navigator`);
    }

    if (screens.length === 0) {
      if (__DEV__) {
        console.warn(`[NavigationValidator] No screens provided for ${type} navigator`);
      }
      return;
    }

    const screenNames = new Set<string>();
    
    screens.forEach((screen, index) => {
      if (!screen.name || typeof screen.name !== "string" || screen.name.trim() === "") {
        throw new Error(`Screen at index ${index} must have a valid non-empty name`);
      }

      // Check for duplicate screen names
      if (screenNames.has(screen.name)) {
        throw new Error(`Duplicate screen name '${screen.name}' found at index ${index}`);
      }
      screenNames.add(screen.name);

      if (!screen.component || typeof screen.component !== "function") {
        throw new Error(`Screen '${screen.name}' must have a valid component`);
      }

      if (type === "tab") {
        const tabScreen = screen as TabScreen;
        if (!tabScreen.label || typeof tabScreen.label !== "string" || tabScreen.label.trim() === "") {
          throw new Error(`Tab screen '${screen.name}' must have a valid non-empty label`);
        }

        if (tabScreen.icon !== undefined && (typeof tabScreen.icon !== "string" || tabScreen.icon.trim() === "")) {
          if (__DEV__) {
            console.warn(`[NavigationValidator] Tab screen '${screen.name}' has invalid icon, it will be ignored`);
          }
        }

        if (tabScreen.label.length > 50) {
          throw new Error(`Tab screen '${screen.name}' label too long (max 50 characters)`);
        }
      }
    });
  }

  static validateInitialRoute(initialRouteName: string | undefined, screens: TabScreen[] | StackScreen[]): void {
    if (initialRouteName && !screens.find(screen => screen.name === initialRouteName)) {
      const error = `Initial route '${initialRouteName}' not found in screens. Available screens: ${screens.map(s => s.name).join(", ")}`;
      if (__DEV__) {
        console.error(`[NavigationValidator] ${error}`);
      }
      throw new Error(error);
    }
  }
}