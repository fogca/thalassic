// Fontplus の型ガード
function getFP(): any | null {
    // @ts-ignore
    return typeof window !== 'undefined' && (window as any).FONTPLUS ? (window as any).FONTPLUS : null;
  }
  
  /** 初期化（1回だけ） */
  export function fontplusInit(options?: {
    selector?: string;             // 例: 'body'（未指定ならbody）
    families?: string[];           // 例: ['YourJP', 'YourJP Bold']
    async?: boolean;               // trueなら非同期モード
  }) {
    const FP = getFP();
    if (!FP) return;
  
    // 対象DOM（遷移で内容が変わるので広めに）
    FP.targetSelector(options?.selector ?? 'body');
  
    if (options?.async) {
      FP.async();   // 非同期モードON
    } else {
      FP.start();   // 同期（非async）を明示
    }
  
    if (options?.families?.length) {
      FP.setFonts(options.families);
    }
  
    // 完了イベント（任意・デバッグ用）
    FP.attachCompleteEvent?.(() => {
      // console.log('FONTPLUS complete');
    });
  }
  
  /** ページ遷移/DOM更新後に実行：再スキャン＆適用 */
  export function fontplusRefresh() {
    const FP = getFP();
    if (!FP) return;
  
    // 最も簡単＆確実：現在の設定で再ロード
    FP.reload?.();           // 引数なしで直近設定を再適用
  
    // 必要に応じて、明示的に対象を広げたいとき（任意）:
    // FP.targetSelector('body');
    // FP.start(); // async解除したいとき
    // FP.load([...], callback, tagid) // 指定ロードしたいとき
  }