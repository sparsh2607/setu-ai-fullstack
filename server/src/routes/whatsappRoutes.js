import express from 'express'
import twilio from 'twilio'
import { handleWhatsAppMessage } from '../services/whatsappService.js'


const router = express.Router()

router.post('/webhook', async (req, res) => {
  try {
    const from = req.body.From
    const text = req.body.Body || ''

    console.log('[twilio-whatsapp] From:', from)
    console.log('[twilio-whatsapp] Message:', text)

    const twiml = new twilio.twiml.MessagingResponse()

    if (!from || !text) {
      twiml.message('Please send a text message.')
      res.type('text/xml')
      return res.status(200).send(twiml.toString())
    }

    const replies = await handleWhatsAppMessage(from, text)

    console.log('[twilio-whatsapp] Replies:', replies)

    for (const reply of replies) {
      twiml.message(reply)
    }

    res.type('text/xml')
    return res.status(200).send(twiml.toString())
  } catch (error) {
    console.error('[twilio-whatsapp] Webhook error:', error)

    const twiml = new twilio.twiml.MessagingResponse()
    twiml.message('Sorry, Setu AI faced an error. Please type START to try again.')

    res.type('text/xml')
    return res.status(200).send(twiml.toString())
  }
})

router.get('/test', async (req, res) => {
  try {
    const phone = req.query.phone || 'whatsapp:+917906861357'
    const message = req.query.message || 'hi'

    const replies = await handleWhatsAppMessage(phone, message)

    return res.json({
      success: true,
      phone,
      message,
      replies,
    })
  } catch (error) {
    console.error('[whatsapp-test] Error:', error)

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

router.post('/test', async (req, res) => {
  try {
    const phone = req.body.phone || 'whatsapp:+917906861357'
    const message = req.body.message || 'hi'

    const replies = await handleWhatsAppMessage(phone, message)

    return res.json({
      success: true,
      phone,
      message,
      replies,
    })
  } catch (error) {
    console.error('[whatsapp-test] Error:', error)

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

export default router