import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const data = await request.formData();

    const file = data.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { error: "Arquivo não encontrado" },
            { status: 400 }
        );
    }

    console.log("Arquivo recebido:", file.name);

    return NextResponse.json({
        success: true,
        fileName: file.name,
    });
}