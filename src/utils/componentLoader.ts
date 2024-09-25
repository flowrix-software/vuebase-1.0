import { defineAsyncComponent, Component } from 'vue';

export function loadComponent(path: string, fallback: string): Component {
  return defineAsyncComponent(() =>
    import(path).catch(() => {
      return import(fallback);
    })
  );
}