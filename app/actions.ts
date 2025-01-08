"use server";

import { revalidatePath } from "next/cache";

export async function testConnection() {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.error(
            "Missing environment variables: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID"
        );
        return {
            success: false,
            message: "Telegram bot token or chat ID is missing.",
        };
    }

    try {
        // Test the connection
        const apiUrl = `https://api.telegram.org/bot${botToken}/getMe`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.ok) {
            console.error("Telegram API error:", data);
            return {
                success: false,
                message: `Failed to connect to Telegram: ${
                    data.description || "Unknown error"
                }`,
            };
        }

        // Send a message to the specified chat ID
        const messageText =
            "Hello! This is a test message from your Telegram bot.";
        const sendMessageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const messageResponse = await fetch(sendMessageUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: messageText,
            }),
        });
        const messageData = await messageResponse.json();

        if (!messageData.ok) {
            console.error("Telegram sendMessage error:", messageData);
            return {
                success: false,
                message: `Failed to send message: ${
                    messageData.description || "Unknown error"
                }`,
            };
        }

        revalidatePath("/");
        return {
            success: true,
            message: `Connection successful! Bot name: ${data.result.first_name}. Test message sent to chat ID: ${chatId}.`,
        };
    } catch (error) {
        console.error("Error in testConnection:", error);
        return {
            success: false,
            message: `An error occurred: ${
                error instanceof Error ? error.message : String(error)
            }`,
        };
    }
}
