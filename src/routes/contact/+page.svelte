<script lang="ts">
  import { enhance } from '$app/forms';
  import { lang } from '$lib/utils/lang';
  import { t } from './contact.dict';

  export let form;

  let loading = false;
</script>

<svelte:head>
  <title>Contact | Thalassic Capital</title>
  <meta name="description" content="Get in touch with Thalassic Capital. We welcome inquiries about real estate, hospitality partnerships, and investment opportunities." />
  <meta property="og:title" content="Contact | Thalassic Capital" />
  <meta property="og:description" content="Get in touch with Thalassic Capital. We welcome inquiries about real estate, hospitality partnerships, and investment opportunities." />
  <meta property="og:url" content="https://thalassiccapital.com/contact" />
</svelte:head>

<section class="Contact">
  <h1 class="h0" lang="en">Contact</h1>
  <div class="contact-container">
    {#if form?.success}
      <div class="success-message">
        <p>{@html t('formSuccessBody', $lang)}</p>
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
            {t('formNameLabel', $lang)} <span class="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
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
            name="email"
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
            name="phone"
            placeholder={t('formPhonePlaceholder', $lang)}
            required
          />
        </div>

        <!-- Type of Contact -->
        <div class="form-group">
          <label for="type">
            {t('formTypeLabel', $lang)} <span class="required">*</span>
          </label>
          <select id="type" name="type" required>
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
            name="company"
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
            name="department"
            placeholder={t('formDepartmentPlaceholder', $lang)}
          />
        </div>

        <!-- Website (Optional) -->
        <div class="form-group">
          <label for="website">{t('formWebsiteLabel', $lang)}</label>
          <input
            type="url"
            id="website"
            name="website"
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
            name="message"
            rows="6"
            placeholder={t('formMessagePlaceholder', $lang)}
            required
          ></textarea>
        </div>

        {#if form?.error}
          <div class="error-message">
            <p>{form.error}</p>
          </div>
        {/if}

        <button type="submit" class="submit-btn" disabled={loading}>
          {loading ? t('formSubmitting', $lang) : t('formSubmit', $lang)}
        </button>
      </form>
    {/if}
  </div>
</section>

<style>
  .Contact {
    padding-top: 20vh;
  }
  .Contact h1 {
    font-size: 3.6rem;
  }

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
    border-color: #3b82f6;
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
    background: #3b82f6;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
    align-self: flex-start;
    letter-spacing: 0.05em;
  }

  .submit-btn:hover:not(:disabled) {
    background: #2563eb;
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
