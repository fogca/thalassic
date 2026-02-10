<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
    let titleElement: HTMLElement;
  
    // テキストをword > char構造に分割
    interface CharData {
      char: string;
      globalIndex: number;
    }
  
    interface WordData {
      word: string;
      wordIndex: number;
      chars: CharData[];
    }
  
    interface LineData {
      words: WordData[];
      isWhitespace: boolean[];
    }
  
    const rawLines = [
      "Echoing the land's",
      "essence, Shaping the next",
      "century's form"
    ];
  
    let charTotal = 0;
    let wordTotal = 0;
  
    const lines: LineData[] = rawLines.map((line) => {
      const wordStrings = line.split(' ');
      const words: WordData[] = wordStrings.map((w) => {
        const chars: CharData[] = w.split('').map((c) => ({
          char: c,
          globalIndex: charTotal++
        }));
        return {
          word: w,
          wordIndex: wordTotal++,
          chars
        };
      });
      // word間のwhitespace（最後のwordの後にはなし）
      const isWhitespace = wordStrings.map((_, i) => i < wordStrings.length - 1);
      return { words, isWhitespace };
    });
  
    onMount(() => {
      gsap.registerPlugin(ScrollTrigger);
  
      const chars = titleElement.querySelectorAll('.char');
  
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 5,
          rotateX: -90,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transformPerspective: 1000,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.0025,
          scrollTrigger: {
            trigger: titleElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  </script>
  
  <div class="Title" bind:this={titleElement}>
    <h1
      class="h1 splitting --split"
      lang="en"
      style="--word-total: {wordTotal}; --char-total: {charTotal};"
    >
      {#each lines as line, lineIndex}
        {#each line.words as wordData, wordIndex}
          <span class="word" data-word={wordData.word} style="--word-index: {wordData.wordIndex};">
            {#each wordData.chars as { char, globalIndex }}
              <span
                class="char"
                data-char={char}
                style="--char-index: {globalIndex};"
              >{char}</span>
            {/each}
          </span>
          {#if line.isWhitespace[wordIndex]}
            <span class="whitespace"> </span>
          {/if}
        {/each}
        {#if lineIndex < lines.length - 1}<br />{/if}
      {/each}
    </h1>
  </div>
  
  <style lang="scss">
  
    .Title h1 {
      font-size: 48px;
      line-height: 1.2;
      text-align: center;
      color: white;
    }

    .Title h1 span {line-height: 1.2;color: white;}
  
    .Title .word {
      display: inline-block;
    }
  
    .Title .whitespace {
      display: inline-block;
    }
  
    .Title .char {
      display: inline-block;
      will-change: opacity, transform;
      transform-origin: 50% 0%;
    }
  
    @media screen and (max-width: 834px) {
      .Title {
        padding: 120px 0;
      }
  
      .Title h1 {
        font-size: 48px;
      }
    }
  </style>