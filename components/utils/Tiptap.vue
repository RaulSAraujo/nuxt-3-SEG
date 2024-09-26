<script setup lang="ts">
// @ts-ignore
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";

const props = defineProps<{
  content?: string | undefined;
  editable: boolean;
}>();

const editor = useEditor({
  content: props.content ?? "",
  editorProps: {
    attributes: {
      class:
        "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
    },
  },
  editable: props.editable,
  extensions: [
    TiptapStarterKit,
    Highlight.configure({ multicolor: true }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
  ],
});

onBeforeUnmount(() => {
  unref(editor)!.destroy();
});

defineExpose({ editor });
</script>

<template>
  <ClientOnly>
    <div v-if="editor" class="pa-3">
      <div class="d-flex justify-space-between">
        <v-btn-toggle dark multiple variant="outlined" color="primary">
          <v-btn
            icon="mdi-format-bold"
            :color="editor.isActive('bold') ? 'primary' : 'secondary'"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            @click="editor.chain().focus().toggleBold().run()"
          />

          <v-btn
            icon="mdi-format-italic"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()"
          />

          <v-btn
            icon="mdi-format-strikethrough"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()"
          />
        </v-btn-toggle>

        <v-btn-toggle dark mandatory variant="outlined" color="primary">
          <v-btn
            icon="mdi-format-paragraph"
            :class="{ 'is-active': editor.isActive('paragraph') }"
            @click="editor.chain().focus().setParagraph().run()"
          />

          <v-btn
            icon="mdi-format-header-1"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          />

          <v-btn
            icon="mdi-format-header-2"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          />

          <v-btn
            icon="mdi-format-header-3"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          />

          <v-btn
            icon="mdi-format-header-4"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          />

          <v-btn
            icon="mdi-format-header-5"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          />

          <v-btn
            icon="mdi-format-header-6"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          />
        </v-btn-toggle>

        <v-btn-toggle dark variant="outlined" color="primary">
          <v-btn
            icon="mdi-format-list-bulleted"
            :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
          />

          <v-btn
            icon="mdi-format-list-numbered"
            :class="{ 'is-active': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()"
          />

          <v-btn
            icon="mdi-format-list-checks"
            @click="editor.chain().focus().toggleTaskList().run()"
            :class="{ 'is-active': editor.isActive('taskList') }"
          />
        </v-btn-toggle>

        <v-btn-toggle dark variant="outlined" color="primary">
          <v-btn
            icon="mdi-code-tags"
            :class="{ 'is-active': editor.isActive('code') }"
            @click="editor.chain().focus().toggleCode().run()"
          />

          <v-btn
            icon="mdi-lightning-bolt"
            :class="{ 'is-active': editor.isActive('highlight') }"
            @click="editor.chain().focus().toggleHighlight().run()"
          />

          <v-btn
            icon="mdi-minus"
            @click="editor.chain().focus().setHorizontalRule().run()"
          />
        </v-btn-toggle>

        <v-btn-toggle dark mandatory variant="outlined" color="primary">
          <v-btn
            icon="mdi-format-align-left"
            @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          />
          <v-btn
            icon="mdi-format-align-center"
            @click="editor.chain().focus().setTextAlign('center').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          />
          <v-btn
            icon="mdi-format-align-right"
            @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          />
        </v-btn-toggle>

        <v-btn-toggle dark variant="outlined" color="primary">
          <v-btn
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
          >
            undo
          </v-btn>

          <v-btn
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()"
          >
            redo
          </v-btn>
        </v-btn-toggle>
      </div>

      <TiptapEditorContent :editor="editor" />
    </div>
  </ClientOnly>
</template>

<style>
.tiptap {
  border: 1px solid #555252;
  border-radius: 8px;
  padding: 8px 10px 8px 15px;
  margin: 20px;
}

.tiptap ul,
ol {
  padding: 0 1rem;
  margin: 1.25rem 1rem 1.25rem 0.4rem;
}

.tiptap li p {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}

ul[data-type="taskList"] {
  list-style: none;
  margin-left: 0;
  padding: 0;

  li {
    align-items: center;
    display: flex;

    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    > div {
      flex: 1 1 auto;
    }
  }

  input[type="checkbox"] {
    cursor: pointer;
  }

  ul[data-type="taskList"] {
    margin: 0;
  }
}

.tiptap .mention {
  background-color: var(--purple-light);
  border-radius: 0.4rem;
  box-decoration-break: clone;
  color: var(--purple);
  padding: 0.1rem 0.3rem;
}

.tiptap:hover {
  border: 1px solid white;
}
</style>
