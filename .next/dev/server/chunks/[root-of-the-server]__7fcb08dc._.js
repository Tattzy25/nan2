module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/nano-main/nano-main/app/api/generate-image/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@opentelemetry+_3a23a8f646cf08a50a02cbb7ec41fbf4/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ai$40$5$2e$0$2e$100_zod$40$4$2e$1$2e$12$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/ai@5.0.100_zod@4.1.12/node_modules/ai/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$gateway$40$2$2e$0$2e$14_zod$40$4$2e$1$2e$12$2f$node_modules$2f40$ai$2d$sdk$2f$gateway$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@ai-sdk+gateway@2.0.14_zod@4.1.12/node_modules/@ai-sdk/gateway/dist/index.mjs [app-route] (ecmascript)");
;
;
;
const dynamic = "force-dynamic";
const MAX_PROMPT_LENGTH = 5000;
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
;
const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
];
async function POST(request) {
    try {
        const apiKey = process.env.AI_GATEWAY_API_KEY;
        if (!apiKey) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Configuration error",
                details: "No AI Gateway API key configured. Please add AI_GATEWAY_API_KEY to environment variables."
            }, {
                status: 500
            });
        }
        const formData = await request.formData();
        const mode = formData.get("mode");
        const prompt = formData.get("prompt");
        const aspectRatio = formData.get("aspectRatio");
        if (!mode) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Mode is required"
            }, {
                status: 400
            });
        }
        if (!prompt?.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Prompt is required"
            }, {
                status: 400
            });
        }
        if (prompt.length > MAX_PROMPT_LENGTH) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Prompt too long. Maximum ${MAX_PROMPT_LENGTH} characters allowed.`
            }, {
                status: 400
            });
        }
        const geminiAspectRatioMap = {
            portrait: "9:16",
            landscape: "16:9",
            wide: "21:9",
            "4:3": "4:3",
            "3:4": "3:4",
            "3:2": "3:2",
            "2:3": "2:3",
            "5:4": "5:4",
            "4:5": "4:5",
            square: "1:1"
        };
        const geminiAspectRatio = geminiAspectRatioMap[aspectRatio] || "1:1";
        const gateway = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$ai$2d$sdk$2b$gateway$40$2$2e$0$2e$14_zod$40$4$2e$1$2e$12$2f$node_modules$2f40$ai$2d$sdk$2f$gateway$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGateway"])({
            apiKey: apiKey
        });
        const model = gateway("google/gemini-3-pro-image");
        if (mode === "text-to-image") {
            const imageGenerationPrompt = `Generate a high-quality image based on this description: ${prompt}. The image should be visually appealing and match the description as closely as possible.`;
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ai$40$5$2e$0$2e$100_zod$40$4$2e$1$2e$12$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateText"])({
                model,
                prompt: imageGenerationPrompt,
                providerOptions: {
                    google: {
                        responseModalities: [
                            "IMAGE"
                        ],
                        imageConfig: {
                            aspectRatio: geminiAspectRatio
                        }
                    }
                }
            });
            const imageFiles = result.files?.filter((f)=>f.mediaType?.startsWith("image/")) || [];
            if (imageFiles.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "No image generated",
                    details: "The model did not return any images"
                }, {
                    status: 500
                });
            }
            const firstImage = imageFiles[0];
            const imageUrl = `data:${firstImage.mediaType};base64,${firstImage.base64}`;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                url: imageUrl,
                prompt: prompt,
                description: result.text || ""
            });
        } else if (mode === "image-editing") {
            const image1 = formData.get("image1");
            const image2 = formData.get("image2");
            const image1Url = formData.get("image1Url");
            const image2Url = formData.get("image2Url");
            const hasImage1 = image1 || image1Url;
            const hasImage2 = image2 || image2Url;
            if (!hasImage1) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "At least one image is required for editing mode"
                }, {
                    status: 400
                });
            }
            if (image1) {
                if (image1.size > MAX_FILE_SIZE) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: `Image 1 too large. Maximum ${MAX_FILE_SIZE / 1024 / 1024}MB allowed.`
                    }, {
                        status: 400
                    });
                }
                if (!ALLOWED_IMAGE_TYPES.includes(image1.type)) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: "Image 1 has invalid format. Allowed: JPEG, PNG, WebP, GIF"
                    }, {
                        status: 400
                    });
                }
            }
            if (image2) {
                if (image2.size > MAX_FILE_SIZE) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: `Image 2 too large. Maximum ${MAX_FILE_SIZE / 1024 / 1024}MB allowed.`
                    }, {
                        status: 400
                    });
                }
                if (!ALLOWED_IMAGE_TYPES.includes(image2.type)) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: "Image 2 has invalid format. Allowed: JPEG, PNG, WebP, GIF"
                    }, {
                        status: 400
                    });
                }
            }
            const convertToDataUrl = async (source)=>{
                if (typeof source === "string") {
                    const response = await fetch(source);
                    const arrayBuffer = await response.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const base64 = buffer.toString("base64");
                    const contentType = response.headers.get("content-type") || "image/jpeg";
                    return `data:${contentType};base64,${base64}`;
                } else {
                    const arrayBuffer = await source.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const base64 = buffer.toString("base64");
                    return `data:${source.type};base64,${base64}`;
                }
            };
            const image1DataUrl = await convertToDataUrl(hasImage1 ? image1 || image1Url : "");
            const image2DataUrl = hasImage2 ? await convertToDataUrl(image2 || image2Url) : null;
            const messageParts = [];
            messageParts.push({
                type: "image",
                image: image1DataUrl
            });
            if (image2DataUrl) {
                messageParts.push({
                    type: "image",
                    image: image2DataUrl
                });
            }
            const editingPrompt = hasImage2 ? `${prompt}. Combine these two images creatively while following the instructions.` : `${prompt}. Edit or transform this image based on the instructions.`;
            messageParts.push({
                type: "text",
                text: editingPrompt
            });
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$ai$40$5$2e$0$2e$100_zod$40$4$2e$1$2e$12$2f$node_modules$2f$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["generateText"])({
                model,
                messages: [
                    {
                        role: "user",
                        // @ts-ignore - Type issue with content parts
                        content: messageParts
                    }
                ],
                providerOptions: {
                    google: {
                        responseModalities: [
                            "IMAGE"
                        ],
                        imageConfig: {
                            aspectRatio: geminiAspectRatio
                        }
                    }
                }
            });
            const imageFiles = result.files?.filter((f)=>f.mediaType?.startsWith("image/")) || [];
            if (imageFiles.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "No image generated",
                    details: "The model did not return any images"
                }, {
                    status: 500
                });
            }
            const firstImage = imageFiles[0];
            const imageUrl = `data:${firstImage.mediaType};base64,${firstImage.base64}`;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                url: imageUrl,
                prompt: editingPrompt,
                description: result.text || ""
            });
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid mode",
                details: "Mode must be 'text-to-image' or 'image-editing'"
            }, {
                status: 400
            });
        }
    } catch (error) {
        console.error("Error in generate-image route:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$opentelemetry$2b$_3a23a8f646cf08a50a02cbb7ec41fbf4$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to generate image",
            details: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7fcb08dc._.js.map