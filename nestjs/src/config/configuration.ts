export default () => ({
    port: parseInt(process.env.PORT || '3000', 10) || 3000,
    host: process.env.HOST,
});
