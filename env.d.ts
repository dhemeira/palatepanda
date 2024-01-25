/// <reference types="vite/client" />

interface Window {
  PasswordCredential: any;
  FederatedCredential: any;
}

declare let SvgIcon: import('vue').DefineComponent<{
  type: {
    type: StringConstructor;
    default: string;
  };
  path: {
    type: StringConstructor;
    default: string;
  };
  size: {
    type: NumberConstructor;
    optional: boolean;
  };
  viewbox: {
    type: StringConstructor;
    optional: boolean;
  };
  flip: {
    type: StringConstructor;
    optional: boolean;
  };
  rotate: {
    type: StringConstructor;
    optional: boolean;
  };
}>;

interface Recipe {
  id: string;
  title: string;
  coverImage?: string;
  author: string;
  authorName: string;
}

type AlertType = 'success' | 'refresh' | 'refresh' | 'info' | undefined;

declare module '@jamescoyle/vue-icon' {
  export default SvgIcon;
}
