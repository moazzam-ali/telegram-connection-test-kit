"use client";

import { useState } from "react";
import { testConnection } from "./actions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function Home() {
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTestConnection = async () => {
        setIsLoading(true);
        try {
            const response = await testConnection();
            setResult(response);
        } catch (error) {
            console.error("Error in handleTestConnection:", error);
            setResult({
                success: false,
                message: `An unexpected error occurred: ${
                    error instanceof Error ? error.message : String(error)
                }`,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Telegram Connection Test</CardTitle>
                    <CardDescription>
                        Test your Telegram bot connection and send a message
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={handleTestConnection}
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? "Testing..." : "Test Connection"}
                    </Button>
                </CardContent>
                <CardFooter>
                    {result && (
                        <Alert
                            variant={result.success ? "default" : "destructive"}
                            className="mt-4"
                        >
                            {result.success ? (
                                <CheckCircle2 className="h-4 w-4" />
                            ) : (
                                <AlertCircle className="h-4 w-4" />
                            )}
                            <AlertTitle>
                                {result.success ? "Success" : "Error"}
                            </AlertTitle>
                            <AlertDescription>
                                {result.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
