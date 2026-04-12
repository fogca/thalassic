import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const resend = new Resend(RESEND_API_KEY);

const TYPE_LABELS: Record<string, string> = {
  business: '事業について',
  service: 'サービスについて',
  recruit: '採用について',
};

export const POST: RequestHandler = async ({ request }) => {
  const { name, email, phone, type, company, department, website, message } =
    await request.json();

  if (!name || !email || !phone || !type || !company || !message) {
    return new Response(JSON.stringify({ error: '必須項目を入力してください' }), {
      status: 400,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: 'メールアドレスの形式が正しくありません' }),
      { status: 400 }
    );
  }

  const typeLabel = TYPE_LABELS[type] ?? type;

  const { error } = await resend.emails.send({
    from: 'Contact Form <contact@thalassiccapital.com>',
    to: ['info@thalassiccapital.com'],
    replyTo: email,
    subject: `【お問い合わせ】${typeLabel} - ${name}様より`,
    html: `
      <h2>新しいお問い合わせがあります</h2>
      <hr />
      <p><strong>お名前:</strong> ${name}</p>
      <p><strong>メールアドレス:</strong> ${email}</p>
      <p><strong>電話番号:</strong> ${phone}</p>
      <p><strong>お問い合わせ種類:</strong> ${typeLabel}</p>
      <p><strong>会社名:</strong> ${company}</p>
      ${department ? `<p><strong>部署名:</strong> ${department}</p>` : ''}
      ${website ? `<p><strong>Webサイト:</strong> ${website}</p>` : ''}
      <hr />
      <p><strong>お問い合わせ内容:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return new Response(
      JSON.stringify({ error: 'メール送信に失敗しました。後ほど再度お試しください。' }),
      { status: 500 }
    );
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
