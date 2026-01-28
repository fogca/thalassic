<script>
  import { enhance } from '$app/forms';
  
  export let form;
  
  let loading = false;
</script>

<section class="Contact">
  <h1 class="h0" lang="en">Contact</h1>
  <div class="contact-container">
    {#if form?.success}
      <div class="success-message">
        <p>お問い合わせありがとうございます。<br>内容を確認の上、折り返しご連絡いたします。</p>
      </div>
    {:else}
      <form 
        method="POST" 
        action="?/submit"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            await update();
            loading = false;
          };
        }}
      >
        <!-- Name -->
        <div class="form-group">
          <label for="name">
            お名前 <span class="required">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="例） サラシック 太郎"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">
            メールアドレス <span class="required">*</span>
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="例） info@thalassiccapital.com"
            required
          />
        </div>

        <!-- Phone -->
        <div class="form-group">
          <label for="phone">
            電話番号 <span class="required">*</span>
          </label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            placeholder="例） 03-0000-0000"
            required
          />
        </div>

        <!-- Type of Contact -->
        <div class="form-group">
          <label for="type">
            お問い合わせ種類 <span class="required">*</span>
          </label>
          <select id="type" name="type" required>
            <option value="" disabled selected>選択してください</option>
            <option value="business">事業について</option>
            <option value="service">サービスについて</option>
            <option value="recruit">採用について</option>
          </select>
        </div>

        <!-- Company Name -->
        <div class="form-group">
          <label for="company">
            会社名 <span class="required">*</span>
          </label>
          <input 
            type="text" 
            id="company" 
            name="company" 
            placeholder="例） 株式会社サラシックキャピタル"
            required
          />
        </div>

        <!-- Department (Optional) -->
        <div class="form-group">
          <label for="department">部署名</label>
          <input 
            type="text" 
            id="department" 
            name="department" 
            placeholder="例） マーケティング事業部"
          />
        </div>

        <!-- Website (Optional) -->
        <div class="form-group">
          <label for="website">Webサイト</label>
          <input 
            type="url" 
            id="website" 
            name="website" 
            placeholder="例） https://yourcomapny.com/"
          />
        </div>

        <!-- Message -->
        <div class="form-group">
          <label for="message">
            お問い合わせ内容 <span class="required">*</span>
          </label>
          <textarea 
            id="message" 
            name="message" 
            rows="6"
            placeholder="可能な限り詳しく教えてください"
            required
          ></textarea>
        </div>

        {#if form?.error}
          <div class="error-message">
            <p>{form.error}</p>
          </div>
        {/if}

        <button type="submit" class="submit-btn" disabled={loading}>
          {loading ? '送信中...' : '送信する'}
        </button>
      </form>
    {/if}
  </div>

</section>

<style>

  .Contact {
    padding-top: 20vh;
  }
  .Contact h1 {font-size: 3.6rem;}





  .contact-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .required {
    color: #e74c3c;
    font-size: 12px;
  }

  input,
  select,
  textarea {
    padding: 14px 16px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.2s;
    font-family: inherit;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: #3B82F6;
  }

  input::placeholder,
  textarea::placeholder {
    color: #aaa;
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-btn {
    padding: 18px 48px;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background: #3B82F6;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    align-self: flex-start;
    letter-spacing: 0.05em;
  }

  .submit-btn:hover:not(:disabled) {
    background: #2563EB;
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .success-message {
    padding: 40px;
    background: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 8px;
    text-align: center;
  }

  .success-message p {
    font-size: 18px;
    line-height: 1.8;
    color: #155724;
    margin: 0;
  }

  .error-message {
    padding: 16px;
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    color: #721c24;
  }

  @media (max-width: 768px) {
    .contact-container {
      padding: 40px 16px;
    }

    .submit-btn {
      width: 100%;
    }
  }
</style>