import { auth } from "./auth"
import {NextResponse} from "next/server";

export async function middleware() {
    const session = await auth();
    if (!session) {
        return NextResponse.redirect('http://localhost:3000/i/flow/login');
    }
}

// See "Matching Paths" below to learn more
// 로그인 한 사람만 접근 가능한 위치 추가
export const config = {
    matcher: ['/compose/tweet', '/explore', '/messages', '/search'],
}