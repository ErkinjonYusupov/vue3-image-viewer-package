# Vue 3 Image Viewer

A lightweight, feature-rich image viewer component for Vue 3. Supports rotation, zooming, panning, and responsive design with a beautiful dark modal interface.

## Features

- 🖼 **Full-screen Modal**: Dark, blurred backdrop for focus.
- 🔄 **Rotation**: Rotate images left and right (90° increments).
- 🔍 **Zoom**: Zoom in/out via buttons or mouse wheel.
- ✋ **Pan**: Drag to move zoomed images.
- 📱 **Responsive**: Works perfectly on different screen sizes.
- 🎨 **Minimalist**: Clean UI with SVG icons.

## Installation

```bash
npm install vue3-image-viewer-package-erkinjon
```

## Usage

Import the `ImageViewer` component and the CSS styles in your Vue 3 application.

### Basic Example

```vue
<script setup>
import { ref } from 'vue';
import { ImageViewer } from 'vue3-image-viewer-package-erkinjon';
import 'vue3-image-viewer-package-erkinjon/style.css'; // Don't forget the CSS!

const showViewer = ref(false);
const imageSrc = 'https://example.com/my-image.jpg';

const openViewer = () => {
    showViewer.value = true;
};
</script>

<template>
  <div>
    <img 
      :src="imageSrc" 
      @click="openViewer" 
      style="width: 300px; cursor: pointer;" 
      alt="Thumbnail"
    />

    <ImageViewer 
      v-model="showViewer" 
      :src="imageSrc" 
    />
  </div>
</template>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `modelValue` | `Boolean` | `true` | Controls the visibility of the viewer (v-model). |
| `src` | `String` | `true` | The URL of the image to display. |

## Controls

- **Mouse Wheel**: Zoom In/Out
- **Drag**: Pan the image (when zoomed)
- **Buttons**:
    - **Rotate Left/Right**: Rotates image 90 degrees.
    - **Zoom In/Out**: Adjusts image scale.
    - **1:1**: Resets zoom and position.
    - **Close**: Closes the viewer (Top Right).

## License

MIT
