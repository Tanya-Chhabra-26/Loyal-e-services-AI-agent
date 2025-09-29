// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   const hostname = request.headers.get('host') || '';
//   const currentHost = hostname.split(':')[0]; // remove port
//   const subdomain = currentHost.split('.')[0];

//   if (request.nextUrl.pathname === '/') {

//     return NextResponse.redirect(new URL('/main', request.url))
//   }

//   if (subdomain === 'animation') {
//     return NextResponse.rewrite(new URL('/animation', request.url));
//   }

//   if (subdomain === 'domains') {
//     return NextResponse.rewrite(new URL('/domains', request.url));
//   }

//   if (subdomain === 'technoAi') {
//     return NextResponse.rewrite(new URL('/domains', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/', '/((?!_next).*)'],
// };

// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl;
//   const hostname = request.headers.get('host') || '';
//   const currentHost = hostname.split(':')[0]; // remove port
//   const subdomain = currentHost.split('.')[0];

//   const isStaticAsset = url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|css|js|woff2?|ttf|eot|otf)$/) ||
//                         url.pathname.startsWith('/_next') || url.pathname.startsWith('/favicon.ico');

//   // ✅ Don't touch static files
//   if (isStaticAsset) {
//     return NextResponse.next();
//   }

//   if (url.pathname === '/') {
//     return NextResponse.redirect(new URL('/main', request.url));
//   }

//   if (subdomain === 'animation') {
//     return NextResponse.rewrite(new URL('/animation', request.url));
//   }

//   if (subdomain === 'domains') {
//     return NextResponse.rewrite(new URL('/domains', request.url));
//   }

//   if (subdomain === 'technoai') {
//     return NextResponse.rewrite(new URL('/technoAi', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/', '/((?!_next).*)'],
// };


import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const currentHost = hostname.split(':')[0]; // remove port
  const subdomain = currentHost.split('.')[0];

  const isStaticAsset = url.pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|css|js|woff2?|ttf|eot|otf)$/) ||
    url.pathname.startsWith('/_next') || url.pathname.startsWith('/favicon.ico');

  if (isStaticAsset) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Rewrite subdomains
  if (url.pathname === '/') {
    if (subdomain === 'animation') {
      return NextResponse.rewrite(new URL('/animation', request.url));
    }
    if (subdomain === 'domains') {
      return NextResponse.rewrite(new URL('/domains', request.url));
    }
    if (subdomain === 'technoai') {
      return NextResponse.rewrite(new URL('/technoai', request.url));
    }

    // If subdomain is not one of the above, assume main site
    if (subdomain === 'localhost' || subdomain === 'www') {
      response.headers.set('x-main-homepage', 'true');
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/((?!_next).*)'],
};
