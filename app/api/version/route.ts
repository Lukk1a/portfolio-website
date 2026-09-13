export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      buildTime: process.env.NEXT_PUBLIC_BUILD_TIME || "development",
      status: "active",
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

