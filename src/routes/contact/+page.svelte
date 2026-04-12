<script lang="ts">
  import Gradation from '../../components/snippets/Gradation.svelte';
  import { lang } from '$lib/utils/lang';
  import { t } from './contact.dict';

  let name       = $state('');
  let email      = $state('');
  let phone      = $state('');
  let type       = $state('');
  let company    = $state('');
  let department = $state('');
  let website    = $state('');
  let message    = $state('');
  let status     = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
  let errorMsg   = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    status = 'sending';
    errorMsg = '';

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, type, company, department, website, message }),
    });

    if (res.ok) {
      status = 'success';
    } else {
      const data = await res.json().catch(() => ({}));
      errorMsg = data.error ?? 'エラーが発生しました';
      status = 'error';
    }
  }
</script>

<svelte:head>
  <title>Contact | Thalassic Capital</title>
  <meta name="description" content="Get in touch with Thalassic Capital. We welcome inquiries about real estate, hospitality partnerships, and investment opportunities." />
  <meta property="og:title" content="Contact | Thalassic Capital" />
  <meta property="og:description" content="Get in touch with Thalassic Capital. We welcome inquiries about real estate, hospitality partnerships, and investment opportunities." />
  <meta property="og:url" content="https://thalassiccapital.com/contact" />
</svelte:head>

<div class="fixedGrad">
  <Gradation />
</div>

<section class="Contact">
  <h1 class="h0 white" lang="en">Contact</h1>
  <div class="contact-container">
    {#if status === 'success'}
      <div class="success-message">
        <p>{@html t('formSuccessBody', $lang)}</p>
      </div>
    {:else}
      <form onsubmit={handleSubmit}>
        <!-- Name -->
        <div class="form-group">
          <label for="name">
            {t('formNameLabel', $lang)} <span class="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            bind:value={name}
            placeholder={t('formNamePlaceholder', $lang)}
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">
            {t('formEmailLabel', $lang)} <span class="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            bind:value={email}
            placeholder={t('formEmailPlaceholder', $lang)}
            required
          />
        </div>

        <!-- Phone -->
        <div class="form-group">
          <label for="phone">
            {t('formPhoneLabel', $lang)} <span class="required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            bind:value={phone}
            placeholder={t('formPhonePlaceholder', $lang)}
            required
          />
        </div>

        <!-- Type of Contact -->
        <div class="form-group">
          <label for="type">
            {t('formTypeLabel', $lang)} <span class="required">*</span>
          </label>
          <select id="type" bind:value={type} required>
            <option value="" disabled selected>{t('formTypePlaceholder', $lang)}</option>
            <option value="business">{t('formTypeBusiness', $lang)}</option>
            <option value="service">{t('formTypeService', $lang)}</option>
            <option value="recruit">{t('formTypeRecruit', $lang)}</option>
          </select>
        </div>

        <!-- Company Name -->
        <div class="form-group">
          <label for="company">
            {t('formCompanyLabel', $lang)} <span class="required">*</span>
          </label>
          <input
            type="text"
            id="company"
            bind:value={company}
            placeholder={t('formCompanyPlaceholder', $lang)}
            required
          />
        </div>

        <!-- Department (Optional) -->
        <div class="form-group">
          <label for="department">{t('formDepartmentLabel', $lang)}</label>
          <input
            type="text"
            id="department"
            bind:value={department}
            placeholder={t('formDepartmentPlaceholder', $lang)}
          />
        </div>

        <!-- Website (Optional) -->
        <div class="form-group">
          <label for="website">{t('formWebsiteLabel', $lang)}</label>
          <input
            type="url"
            id="website"
            bind:value={website}
            placeholder={t('formWebsitePlaceholder', $lang)}
          />
        </div>

        <!-- Message -->
        <div class="form-group">
          <label for="message">
            {t('formMessageLabel', $lang)} <span class="required">*</span>
          </label>
          <textarea
            id="message"
            bind:value={message}
            rows="6"
            placeholder={t('formMessagePlaceholder', $lang)}
            required
          ></textarea>
        </div>

        {#if status === 'error'}
          <div class="error-message">
            <p>{errorMsg}</p>
          </div>
        {/if}

        <button type="submit" class="submit-btn" disabled={status === 'sending'}>
          {status === 'sending' ? t('formSubmitting', $lang) : t('formSubmit', $lang)}
        </button>
      </form>
    {/if}
  </div>
</section>

<style>
  /* ── Page layout ──────────────────────────────────────────────── */
  .Contact {
    position: relative;
    z-index: 1;
    padding-top: 20vh;
    padding-bottom: 10vh;
    min-height: 100vh;
  }

  .Contact *:not(input):not(textarea):not(select):not(option):not(.submit-btn) {
    color: white;
  }

  .Contact h1 {
    padding: 0 var(--padding);
    margin-bottom: 2rem;
  }

  /* ── Glass form container ─────────────────────────────────────── */
  .contact-container {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 var(--padding) 6rem;
  }

  .success-message {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(24px) saturate(160%);
    -webkit-backdrop-filter: blur(24px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 20px;
    padding: 48px 40px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  /* ── Form fields ──────────────────────────────────────────────── */
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.75;
  }

  .required {
    color: rgba(255, 180, 180, 0.9);
    font-size: 11px;
  }

  input,
  select,
  textarea {
    padding: 13px 16px;
    font-size: 15px;
    font-family: inherit;
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    transition: border-color 0.2s, background 0.2s;
    outline: none;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: rgba(255, 255, 255, 0.55);
    background: rgba(255, 255, 255, 0.15);
  }

  input::placeholder,
  textarea::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
  }

  select option {
    background: #1a3a6e;
    color: white;
  }

  textarea {
    resize: vertical;
    min-height: 130px;
  }

  /* ── Submit button ────────────────────────────────────────────── */
  .submit-btn {
    align-self: flex-start;
    padding: 15px 48px;
    font-size: 14px;
    letter-spacing: 0.08em;
    color: white !important;
    background: rgba(255, 255, 255, 0.18);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 40px;
    cursor: pointer;
    backdrop-filter: blur(8px);
    transition: background 0.2s, border-color 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.28);
    border-color: rgba(255, 255, 255, 0.55);
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ── States ───────────────────────────────────────────────────── */
  .success-message {
    text-align: center;
    padding: 60px 40px;
  }

  .success-message p {
    font-size: 17px;
    line-height: 1.8;
    opacity: 0.9;
    margin: 0;
  }

  .error-message {
    padding: 14px 18px;
    background: rgba(255, 80, 80, 0.15);
    border: 1px solid rgba(255, 100, 100, 0.35);
    border-radius: 8px;
  }

  .error-message p {
    font-size: 13px;
    opacity: 0.9;
    margin: 0;
  }

  /* ── Mobile ───────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    .success-message {
      padding: 32px 20px;
      border-radius: 14px;
    }

    .submit-btn {
      width: 100%;
      text-align: center;
    }
  }
</style>
