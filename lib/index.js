"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.name = void 0;
const koishi_2 = require("koishi");
const koishi_1 = require("koishi");
exports.name = '60snews';
exports.Config = koishi_2.Schema.object({
    api_url: koishi_2.Schema.string().default("https://api.03c3.cn/api/zb"),
});
function apply(ctx, config) {
    // write your plugin here
    ctx.command("60s", "60s新闻资讯").action(async ({ options }) => {
        try {
            // 关键修改：设置 responseType 为 'arraybuffer' 以接收二进制数据
            // 同时，不传递任何参数（或传递 type: 'img'），让API返回图片流
            const imageBuffer = await ctx.http.get(config.api_url, {
                responseType: 'arraybuffer', // 这是核心修复
                params: { type: 'img' } // 可省略，因为默认就是img
            });

            // 将获取到的 ArrayBuffer/Buffer 直接传递给 segment.image
            return koishi_1.segment.image(imageBuffer);

        } catch (error) {
            ctx.logger("60snews").warn(error);
            // 更详细的错误信息，便于调试
            return `获取新闻图片失败：${error.message}`;
        }
    });
}
exports.apply = apply;
