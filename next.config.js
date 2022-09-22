const withTM = require('next-transpile-modules')(['swiper']);

module.exports = withTM({
  // Prefer loading of ES Modules over CommonJS
  async redirects() {
    return [
        {
            "source": "/meet-steph",
            "destination": "/our-story",
            "permanent": true
        },
        {
            "source": "/deliverycollection",
            "destination": "/delivery",
            "permanent": true
        },
        {
            "source": "/cookie-policy",
            "destination": "/privacy-cookie-policy",
            "permanent": true
        },
        {
            "source": "/terms-conditions",
            "destination": "/t&cs",
            "permanent": true
        },
        {
            "source": "/recipes-tutorials",
            "destination": "/blog",
            "permanent": true
        },
        {
            "source": "/shop/dried-flowers-letterbox-cookies",
            "destination": "/shop/dried-flowers-letterbox-cookie",
            "permanent": true
        },
        {
            "source": "/shop/floral-cookie-tin",
            "destination": "/shop/flower-cookie-tin",
            "permanent": true
        },
        {
            "source": "/shop/say-it-with-cookies-happy-birthday",
            "destination": "/shop/happy-bday-letterbox-message-cookies",
            "permanent": true
        },
        {
            "source": "/shop/say-it-with-cookies-omg-congrats",
            "destination": "/shop/omg-congrats-letterbox-message-cookies",
            "permanent": true
        },
        {
            "source": "/shop/personalised-birthday-cake-letterbox-cookie",
            "destination": "/shop/personalised-blue-birthday-cake-letterbox-cookie",
            "permanent": true
        },
        {
            "source": "/shop/custom-cookie-message-box",
            "destination": "/shop/personalised-custom-cookie-message-box",
            "permanent": true
        },
        {
            "source": "/shop/personalised-green-birthday-cake-letterbox-cookie",
            "destination": "/shop/personalised-green-birthday-letterbox-cookie",
            "permanent": true
        },
        {
            "source": "/shop/new-home-letterbox-cookies",
            "destination": "/shop/personalised-new-home-letterbox-cookies",
            "permanent": true
        },
        {
            "source": "/shop/oh-baby-marble-and-gold-letterbox-cookies",
            "destination": "/shop/personalised-oh-baby-letterbox-cookies",
            "permanent": true
        },
        {
            "source": "/shop/pam-letterbox-cookie",
            "destination": "/shop/personalised-pam-letterbox-cookies",
            "permanent": true
        },
        {
            "source": "/shop/personalised-pink-birthday-cake-letterbox-cookie",
            "destination": "/shop/personalised-pink-birthday-letterbox-cookie",
            "permanent": true
        },
        {
            "source": "/shop/yay-engagement-box",
            "destination": "/shop/personalised-yay-engagement-letterbox-cookies",
            "permanent": true
        },
        {
            "source": "/shop/say-it-with-cookies-thank-you",
            "destination": "/shop/thank-you-letterbox-message-cookies",
            "permanent": true
        },
        {
            "source": "/shop/thanks-mum-heart-letterbox-cookie",
            "destination": "/shop/thanks-mum-heart-letterbox-cookies",
            "permanent": true
        },
        {
            "source": "/shop/thinking-of-you-cookies",
            "destination": "/shop/thinking-of-you-letterbox-message-cookies",
            "permanent": true
        },
        {
            "source": "/shop/vegan-custom-cookie-message-box",
            "destination": "/shop/vegan-personalised-custom-cookie-message-box",
            "permanent": true
        },
        {
            "source": "/shop/vegan-personalised-green-birthday-cake-letterbox-cookie",
            "destination": "/shop/vegan-personalised-green-birthday-letterbox-cookie",
            "permanent": true
        },
        {
            "source": "/shop/vegan-personalised-pink-birthday-cake-letterbox-cookie",
            "destination": "/shop/vegan-personalised-pink-birthday-letterbox-cookie",
            "permanent": true
        }
    ]

  },
  async rewrites() {
    return [
        {
            "source": "/shop",
            has: [
              {
                type: 'query',
                key: 'category',
                value: 'All+Cookies',
              },
            ],
            "destination": "/products/cookies",
        },
        {
            "source": "/shop",
            has: [
              {
                type: 'query',
                key: 'category',
                value: 'Cookie%20Cakes',
              },
            ],
            "destination": "/products/cakes",
        },
        {
            "source": "/shop",
            has: [
              {
                type: 'query',
                key: 'category',
                value: 'Cookies',
              },
            ],
            "destination": "/products/cookies",
        },
        {
            "source": "/shop",
            has: [
              {
                type: 'query',
                key: 'category',
                value: 'DIY%20Kits',
              },
            ],
            "destination": "/products/diy-kits",
        },
        {
            "source": "/shop",
            has: [
              {
                type: 'query',
                key: 'category',
                value: 'MACARONS',
              },
            ],
            "destination": "/products/macarons",
        }
    ]
  },
})