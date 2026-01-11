import { NavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native';

/**
 * AppNavigation - Global Navigation Utility
 * 
 * Provides static access to navigation methods from anywhere in the app.
 * Must be initialized with setRef in the root NavigationContainer.
 */
export class AppNavigation {
    private static navigationRef: NavigationContainerRef<any> | null = null;

    static setRef(ref: NavigationContainerRef<any> | null): void {
        if (__DEV__) {
            console.log('[AppNavigation] Setting navigation ref', !!ref);
        }
        this.navigationRef = ref;
    }

    static getRef(): NavigationContainerRef<any> | null {
        return this.navigationRef;
    }

    static isReady(): boolean {
        return this.navigationRef?.isReady() ?? false;
    }

    static canGoBack(): boolean {
        return this.navigationRef?.canGoBack() ?? false;
    }

    static navigate(name: string, params?: object): void {
        if (__DEV__) {
            console.log('[AppNavigation] Navigating to:', name, params);
        }
        if (this.navigationRef?.isReady()) {
            this.navigationRef.navigate(name, params);
        }
    }

    static push(name: string, params?: object): void {
        if (__DEV__) {
            console.log('[AppNavigation] Pushing:', name, params);
        }
        if (this.navigationRef?.isReady()) {
            this.navigationRef.dispatch(StackActions.push(name, params));
        }
    }

    static goBack(): void {
        if (__DEV__) {
            console.log('[AppNavigation] Going back');
        }
        if (this.navigationRef?.isReady() && this.navigationRef.canGoBack()) {
            this.navigationRef.goBack();
        }
    }

    static reset(name: string, params?: object): void {
        if (__DEV__) {
            console.log('[AppNavigation] Resetting to:', name, params);
        }
        if (this.navigationRef?.isReady()) {
            this.navigationRef.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name, params }],
                })
            );
        }
    }

    static replace(name: string, params?: object): void {
        if (__DEV__) {
            console.log('[AppNavigation] Replacing with:', name, params);
        }
        if (this.navigationRef?.isReady()) {
            this.navigationRef.dispatch(StackActions.replace(name, params));
        }
    }

    static navigateToNested(parentParams: { screen: string; params?: any }): void {
        if (__DEV__) {
            console.log('[AppNavigation] Navigating to nested:', parentParams);
        }
        if (this.navigationRef?.isReady()) {
            this.navigationRef.navigate(parentParams.screen, parentParams.params);
        }
    }

    static navigateToParent(name: string, params?: object): void {
        if (__DEV__) {
            console.log('[AppNavigation] Navigating to parent:', name, params);
        }
        if (this.navigationRef?.isReady()) {
            const parent = this.navigationRef.getParent();
            if (parent) {
                parent.navigate(name, params);
            }
        }
    }

    static popToTop(): void {
        if (__DEV__) {
            console.log('[AppNavigation] Popping to top');
        }
        if (this.navigationRef?.isReady()) {
            this.navigationRef.dispatch(StackActions.popToTop());
        }
    }

    static pop(count: number = 1): void {
        if (__DEV__) {
            console.log('[AppNavigation] Popping:', count);
        }
        if (this.navigationRef?.isReady()) {
            this.navigationRef.dispatch(StackActions.pop(count));
        }
    }

    static getCurrentRoute(): string | undefined {
        return this.navigationRef?.getCurrentRoute()?.name;
    }

    static getCurrentParams<T extends object>(): T | undefined {
        return this.navigationRef?.getCurrentRoute()?.params as T | undefined;
    }

    static goToSettings(): void {
        this.navigate('Settings');
    }

    static goToProfile(): void {
        this.navigate('Profile');
    }

    static goToHome(): void {
        this.navigate('Home');
    }

    static openModal(name: string, params?: object): void {
        this.navigateToParent(name, params);
    }

    static closeModal(): void {
        if (__DEV__) {
            console.log('[AppNavigation] Closing modal');
        }
        if (this.navigationRef?.isReady()) {
            const parent = this.navigationRef.getParent();
            if (parent?.canGoBack()) {
                parent.goBack();
            }
        }
    }
}
