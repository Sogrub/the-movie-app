export interface SweetConfig {
    position: 'top-center' | 'bottom-center' | 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
    icon: 'sucess' | 'warning' | 'danger';
    text: string;
    timer?: number;
}