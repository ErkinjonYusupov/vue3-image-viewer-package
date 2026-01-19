import ImageViewer from './components/ImageViewer.vue';
import { showImage } from './function.js';

export { showImage };

export default {
    install: (app) => {
        app.config.globalProperties.$showImage = showImage;
        showImage._context = app._context;
    }
};
