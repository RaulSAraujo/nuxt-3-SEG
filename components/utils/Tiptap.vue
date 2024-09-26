<script setup lang="ts">
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Highlight from "@tiptap/extension-highlight";

const props = defineProps<{
  content?: string | undefined;
  editable: boolean;
}>();

const editor = useEditor({
  content: props.content ?? "<br/> <br/>",
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
  ],
});

onBeforeUnmount(() => {
  unref(editor)!.destroy();
});

defineExpose({ editor });
</script>

<template>
  <div>
    <div class="d-flex">
      <ClientOnly>
        <v-btn-toggle
          v-if="editor"
          dark
          multiple
          variant="outlined"
          color="primary"
          divided
          class="mx-1"
        >
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

        <template #fallback>
          <v-skeleton-loader width="150px" color="transparent" type="heading" />
        </template>
      </ClientOnly>

      <ClientOnly>
        <v-btn-toggle
          v-if="editor"
          dark
          variant="outlined"
          color="primary"
          divided
          class="mx-1"
        >
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
            :class="{ 'is-active': editor.isActive('taskList') }"
            @click="editor.chain().focus().toggleTaskList().run()"
          />
        </v-btn-toggle>

        <template #fallback>
          <v-skeleton-loader width="150px" color="transparent" type="heading" />
        </template>
      </ClientOnly>

      <ClientOnly>
        <v-btn-toggle
          v-if="editor"
          dark
          variant="outlined"
          color="primary"
          divided
          class="mx-1"
        >
          <v-btn
            icon="mdi-lightning-bolt"
            :class="{ 'is-active': editor.isActive('Highlight') }"
            @click="editor.chain().focus().toggleHighlight().run()"
          />

          <v-btn
            icon="mdi-minus"
            @click="editor.chain().focus().setHorizontalRule().run()"
          />
        </v-btn-toggle>

        <template #fallback>
          <v-skeleton-loader width="100px" color="transparent" type="heading" />
        </template>
      </ClientOnly>
    </div>

    <ClientOnly>
      <TiptapEditorContent v-if="editor" :editor="editor" />

      <template #fallback>
        <v-skeleton-loader color="transparent" type="heading@3" />
      </template>
    </ClientOnly>
  </div>
</template>

<style>
.tiptap {
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

.tiptap:focus-visible {
  border: 1px solid transparent;
  outline: transparent auto 0px;
}
</style>
