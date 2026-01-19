import { createVNode, render, ref } from 'vue';
import ImageViewer from './components/ImageViewer.vue';

const container = typeof document !== 'undefined' ? document.createElement('div') : null;

/**
 * Programmatically show the image viewer.
 * @param {string|string[]|object} options - Image source URL, array of URLs, or options object
 */
export function showImage(options) {
    if (!container) return;

    let props = {};

    if (typeof options === 'string') {
        props = {
            src: options,
            modelValue: true
        };
    } else if (Array.isArray(options)) {
        props = {
            images: options,
            index: 0,
            modelValue: true
        };
    } else if (typeof options === 'object') {
        props = {
            ...options,
            modelValue: true
        };
    }

    // We need to handle the v-model updates manually since we are rendering programmatically
    const modelValue = ref(true);
    const activeIndex = ref(props.index || 0);

    const vnode = createVNode(ImageViewer, {
        ...props,
        modelValue: modelValue.value,
        index: activeIndex.value,
        'onUpdate:modelValue': (val) => {
            modelValue.value = val;
            if (!val) {
                // Determine if we should destroy
                setTimeout(() => {
                    render(null, container);
                }, 300); // Wait for animation
            }
        },
        'onUpdate:index': (val) => {
            activeIndex.value = val;
            // Re-render to update props if needed, though reactive ref should handle it? 
            // In vanilla createVNode/render loop, we might need to rely on the component's internal reactivity or re-render.
            // But passing refs mostly works. However, usually with createVNode we pass raw values.
            // Let's rely on re-rendering if simple refs don't propagate in this specific manual mount setup.
            renderComponent();
        }
    });

    function renderComponent() {
        // Re-create vnode with current state
        const instance = createVNode(ImageViewer, {
            ...props,
            modelValue: modelValue.value,
            index: activeIndex.value,
            'onUpdate:modelValue': (val) => {
                modelValue.value = val;
                if (!val) {
                    // Cleanup
                    // We can't immediately remove it because of the fade out animation in the component usually
                    // But looking at the component, it uses a Teleport and Transition. 
                    // If we unmount the parent (container), the Teleport target content might disappear abruptly unless we wait?
                    // The component emits update:modelValue false.
                    // If we just set modelValue to false, the component inside handles the transition (v-if).
                    // We just need to keep the vnode alive until transition ends.
                    // Effectively we just re-render with false.
                    renderComponent();
                }
            },
            'onUpdate:index': (val) => {
                activeIndex.value = val;
                renderComponent();
            }
        });

        instance.appContext = showImage._context || null;
        render(instance, container);
    }

    renderComponent();
}

// Allow setting app context to inherit global components/plugins/directives if needed
showImage._context = null;
