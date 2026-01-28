import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  submit: async ({ request }) => {
    const data = await request.formData();
    
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const type = data.get('type') as string;
    const company = data.get('company') as string;
    const department = data.get('department') as string;
    const website = data.get('website') as string;
    const source = data.get('source') as string;
    const message = data.get('message') as string;

    // Validation
    if (!name || !email || !phone || !type || !company || !source || !message) {
      return fail(400, { error: '必須項目を入力してください' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, { error: 'メールアドレスの形式が正しくありません' });
    }

    try {
      // Send email via Resend
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'contact@thalassiccapital.com', // Change to your verified domain
          to: 'info@thalassiccapital.com',
          subject: `【お問い合わせ】${type === 'business' ? '事業について' : type === 'service' ? 'サービスについて' : '採用について'} - ${name}様より`,
          html: `
            <h2>新しいお問い合わせがあります</h2>
            <hr />
            <p><strong>お名前:</strong> ${name}</p>
            <p><strong>メールアドレス:</strong> ${email}</p>
            <p><strong>電話番号:</strong> ${phone}</p>
            <p><strong>お問い合わせ種類:</strong> ${type === 'business' ? '事業について' : type === 'service' ? 'サービスについて' : '採用について'}</p>
            <p><strong>会社名/学校名:</strong> ${company}</p>
            ${department ? `<p><strong>部署名:</strong> ${department}</p>` : ''}
            ${website ? `<p><strong>Webサイト:</strong> ${website}</p>` : ''}
            <p><strong>弊社を知ったきっかけ:</strong> ${source}</p>
            <hr />
            <p><strong>お問い合わせ内容:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend API error:', errorData);
        return fail(500, { error: 'メール送信に失敗しました。後ほど再度お試しください。' });
      }

      return { success: true };
    } catch (error) {
      console.error('Email error:', error);
      return fail(500, { error: 'メール送信に失敗しました。後ほど再度お試しください。' });
    }
  }
} satisfies Actions;