import { readFile } from "fs/promises";
import path from "path";
import { NextResponse, type NextRequest } from "next/server";
import { CV_COOKIE, verifyCvToken } from "@/lib/cv-gate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CV_PATH = path.join(process.cwd(), "private", "errell-nino-cv.pdf");

export async function GET(request: NextRequest) {
  if (!verifyCvToken(request.cookies.get(CV_COOKIE)?.value)) {
    const accept = request.headers.get("accept") || "";
    // Browsers get sent to the email gate; scripts get a plain 401.
    if (accept.includes("text/html")) {
      return NextResponse.redirect(new URL("/cv", request.url), 303);
    }
    return NextResponse.json({ error: "Email required to access the CV." }, {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const file = await readFile(CV_PATH);
  const disposition = request.nextUrl.searchParams.get("download") === "1" ? "attachment" : "inline";
  return new NextResponse(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="errell-nino-cv.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
