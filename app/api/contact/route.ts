import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, company, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Email transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Professional and structured email template
    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message - SEO Expert</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background-color: #ffffff;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #007bff;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #007bff;
                margin: 0;
                font-size: 28px;
            }
            .header p {
                color: #6c757d;
                margin: 5px 0 0 0;
                font-size: 16px;
            }
            .content {
                margin-bottom: 30px;
            }
            .field-group {
                margin-bottom: 20px;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #007bff;
            }
            .field-label {
                font-weight: bold;
                color: #495057;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
            }
            .field-value {
                color: #212529;
                font-size: 16px;
                word-wrap: break-word;
            }
            .message-content {
                background-color: #ffffff;
                border: 1px solid #dee2e6;
                border-radius: 8px;
                padding: 20px;
                margin-top: 10px;
                white-space: pre-wrap;
                line-height: 1.8;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #dee2e6;
                color: #6c757d;
                font-size: 14px;
            }
            .timestamp {
                background-color: #e9ecef;
                padding: 10px;
                border-radius: 5px;
                font-size: 12px;
                color: #495057;
                text-align: center;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>SEO Expert</h1>
                <p>New Contact Message</p>
            </div>
            
            <div class="timestamp">
                Received on ${new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
            </div>

            <div class="content">
                <div class="field-group">
                    <div class="field-label">Full Name</div>
                    <div class="field-value">${firstName} ${lastName}</div>
                </div>

                <div class="field-group">
                    <div class="field-label">Email Address</div>
                    <div class="field-value">
                        <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
                    </div>
                </div>

                ${company ? `
                <div class="field-group">
                    <div class="field-label">Company</div>
                    <div class="field-value">${company}</div>
                </div>
                ` : ''}

                <div class="field-group">
                    <div class="field-label">Subject</div>
                    <div class="field-value">${subject}</div>
                </div>

                <div class="field-group">
                    <div class="field-label">Message</div>
                    <div class="message-content">${message}</div>
                </div>
            </div>

            <div class="footer">
                <p>This message was sent from the SEO Expert contact form</p>
                <p>To reply, use the contact's email address directly: <strong>${email}</strong></p>
            </div>
        </div>
    </body>
    </html>
    `

    // Email configuration
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${process.env.EMAIL_USER}>`,
      to: 'seoexpert.clients@gmail.com',
      replyTo: email,
      subject: `[Contact SEO Expert] ${subject}`,
      html: htmlTemplate,
      text: `
New Contact Message - SEO Expert

Name: ${firstName} ${lastName}
Email: ${email}
${company ? `Company: ${company}` : ''}
Subject: ${subject}

Message:
${message}

---
Received on ${new Date().toLocaleString('en-US')}
      `.trim(),
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { 
        error: 'Error sending email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}