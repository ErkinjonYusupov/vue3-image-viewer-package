import ImageViewer from './components/ImageViewer.vue';

export { ImageViewer };

export default {
    install: (app) => {
        app.component('ImageViewer', ImageViewer);
    }
};
