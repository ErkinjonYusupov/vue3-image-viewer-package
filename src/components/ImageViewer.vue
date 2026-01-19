<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    src: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        default: () => []
    },
    index: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['update:modelValue', 'update:index']);

const scale = ref(1);
const rotation = ref(0);

const isSingleMode = computed(() => props.images.length === 0);
const currentSrc = computed(() => {
    if (isSingleMode.value) return props.src;
    return props.images[props.index] || '';
});

const hasPrev = computed(() => !isSingleMode.value && props.images.length > 1);
const hasNext = computed(() => !isSingleMode.value && props.images.length > 1);

const close = () => {
    emit('update:modelValue', false);
};

const reset = () => {
    scale.value = 1;
    rotation.value = 0;
    translateX.value = 0;
    translateY.value = 0;
};

const next = () => {
    if (isSingleMode.value) return;
    const newIndex = (props.index + 1) % props.images.length;
    emit('update:index', newIndex);
};

const prev = () => {
    if (isSingleMode.value) return;
    const newIndex = (props.index - 1 + props.images.length) % props.images.length;
    emit('update:index', newIndex);
};

const handleKeydown = (e) => {
    if (!props.modelValue) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
};

// Reset state when opened or image changes
watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            reset();
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeydown);
        } else {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeydown);
        }
    }
);

watch(() => props.index, reset);

const rotateLeft = () => {
    rotation.value -= 90;
};

const rotateRight = () => {
    rotation.value += 90;
};

const zoomIn = () => {
    scale.value = Math.min(scale.value + 0.25, 4); // Max zoom 4x
};

const zoomOut = () => {
    scale.value = Math.max(scale.value - 0.25, 0.25); // Min zoom 0.25x
};

const handleWheel = (event) => {
    // Prevent default scroll behavior is handled by .prevent modifier
    const delta = event.deltaY > 0 ? -0.25 : 0.25;
    const newScale = scale.value + delta;
    scale.value = Math.min(Math.max(newScale, 0.25), 4);
};

// Dragging Logic
const isDragging = ref(false);
const translateX = ref(0);
const translateY = ref(0);
let startX = 0;
let startY = 0;
let startTranslateX = 0;
let startTranslateY = 0;

const startDrag = (event) => {
    event.preventDefault(); // Prevent default image drag behavior
    isDragging.value = true;
    startX = event.clientX;
    startY = event.clientY;
    startTranslateX = translateX.value;
    startTranslateY = translateY.value;

    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);
};

const onDrag = (event) => {
    if (!isDragging.value) return;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    translateX.value = startTranslateX + dx;
    translateY.value = startTranslateY + dy;
};

const stopDrag = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', stopDrag);
};
</script>

<template>
    <Teleport to="body">
        <Transition name="iv-fade">
            <div v-if="modelValue" class="iv-overlay" @click.self="close" @wheel.prevent="handleWheel">
                <!-- Navigation Buttons -->
                <button v-if="hasPrev" class="iv-nav-btn iv-prev" @click.stop="prev" title="Previous">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <button v-if="hasNext" class="iv-nav-btn iv-next" @click.stop="next" title="Next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>

                <!-- Image Container -->
                <div class="iv-content">
                    <img :src="currentSrc" class="iv-image" :style="{
                        transform: `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }" @click.stop @mousedown="startDrag" />
                </div>

                <!-- Toolbar (Bottom Center) -->
                <div class="iv-toolbar" @click.stop>

                    <button @click="rotateLeft" title="Rotate Left">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 640">
                            <path fill="currentColor"
                                d="M88 256h144c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-46.7-46.7c75.3-58.6 184.3-53.3 253.5 15.9c75 75 75 196.5 0 271.5s-196.5 75-271.5 0c-10.2-10.2-19-21.3-26.4-33c-9.5-14.9-29.3-19.3-44.2-9.8s-19.3 29.3-9.8 44.2c9.8 15.6 21.5 30.4 35.1 43.9c100 100 262 100 362 0s100-262 0-362c-94.2-94.3-243.7-99.7-344.3-16.2L105 71c-6.9-6.8-17.2-8.9-26.2-5.2S64 78.3 64 88v144c0 13.3 10.7 24 24 24" />
                        </svg>
                    </button>

                    <button @click="rotateRight" title="Rotate Right">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m11.25 5.25h3m0 3.5c0 2.5-2.79822 5.5-6.25 5.5s-6.25-2.7982-6.25-6.25c0-3.45178 2.79822-6.25 6.25-6.25 3.75 0 6.25 3.5 6.25 3.5v-3.5" />
                        </svg>
                    </button>

                    <button @click="zoomOut" title="Zoom Out">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>

                    <button @click="zoomIn" title="Zoom In">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>

                    <button @click="reset" title="Reset 1:1">
                        <span style="font-weight: bold; font-size: 14px;">1:1</span>
                    </button>

                </div>

                <!-- Close Button (Top Right) -->
                <button class="iv-close-btn" @click="close" title="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" />
                    </svg>
                </button>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.iv-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background-color: rgba(82, 82, 82, 0.85);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.iv-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.iv-image {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    transition: transform 0.3s ease-in-out;
    cursor: grab;
    user-select: none;
}

.iv-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(6, 6, 6, 0.2);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    z-index: 100000;
    transition: background 0.2s;
}

.iv-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

.iv-close-btn svg {
    width: 24px;
    height: 24px;
}

.iv-close-btn svg path {
    fill: white;
}

.iv-toolbar {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    background: rgba(40, 40, 40, 0.8);
    padding: 10px 20px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10001;
}

.iv-toolbar button {
    background: transparent;
    border: none;
    color: #eee;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.iv-toolbar button:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    transform: translateY(-2px);
}

/* Animations */
.iv-fade-enter-active,
.iv-fade-leave-active {
    transition: opacity 0.3s ease;
}

.iv-fade-enter-from,
.iv-fade-leave-to {
    opacity: 0;
}

.iv-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    z-index: 10001;
    transition: all 0.2s;
}

.iv-nav-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%) scale(1.1);
}

.iv-prev {
    left: 20px;
}

.iv-next {
    right: 20px;
}
</style>
