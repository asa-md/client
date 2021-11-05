const prod = process.env.NODE_ENV === 'production'

module.exports = {
    images: {
        deviceSizes: [540, 720, 960, 1140, 1320],
    },
    i18n: {
        locales: ['ro', 'ru'],
        defaultLocale: 'ro',
    },
    env: {
        API: prod ? 'https://success.asa.md/api' : 'https://success.asa.md/api',
    },
}
