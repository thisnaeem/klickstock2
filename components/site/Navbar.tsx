import Link from 'next/link';
import { User, Camera, ChevronDown, Search, ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { auth } from '@/auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Navbar = async () => {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <nav className="border-b border-gray-800/30 backdrop-blur-2xl bg-black/90 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white flex items-center gap-3 transition-all duration-300 hover:scale-105 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg transition-all duration-300">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-extrabold tracking-tight">
                KlickStock
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/gallery" 
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-xl hover:bg-white/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Search className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Gallery</span>
            </Link>
            
            <Link 
              href="/images" 
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-xl hover:bg-white/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <ImageIcon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Images</span>
            </Link>
            
            <Link 
              href="/pngs" 
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-xl hover:bg-white/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">PNG&apos;s</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 font-medium px-4 py-2 rounded-xl hover:bg-white/5 relative overflow-hidden focus:outline-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    More 
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="center" 
                className="w-48 mt-2 rounded-2xl p-1 animate-in fade-in-80 zoom-in-95 bg-black/95 backdrop-blur-2xl border border-white/10 shadow-2xl"
              >
                <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-0.5 group">
                  <Link href="/about" className="w-full py-2 px-1 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-0.5 group">
                  <Link href="/pricing" className="w-full py-2 px-1 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Pricing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-0.5 group">
                  <Link href="/contact" className="w-full py-2 px-1 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Contact</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-0.5 group">
                  <Link href="/blog" className="w-full py-2 px-1 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Blog</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="group relative rounded-2xl px-3 py-2 h-auto hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-2 ring-white/10 transition-all duration-300 group-hover:ring-indigo-500/50">
                      <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-semibold">
                        {session.user.name ? session.user.name[0] : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <div className="text-white font-medium text-sm truncate max-w-24">{session.user.name || "User"}</div>
                      <div className="text-gray-400 text-xs">Online</div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-300 group-hover:rotate-180 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-64 mt-2 rounded-2xl p-2 animate-in fade-in-80 zoom-in-95 bg-black/95 backdrop-blur-2xl border border-white/10 shadow-2xl"
                >
                  <DropdownMenuLabel className="px-3 py-3 text-gray-200">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-indigo-500/30">
                        <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                          {session.user.name ? session.user.name[0] : <User className="h-5 w-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white truncate">{session.user.name || "User"}</div>
                        <div className="text-xs text-gray-400 truncate">{session.user.email}</div>
                        <div className="text-xs text-green-400 font-medium">Active</div>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10 my-2" />
                  
                  {/* Mobile Navigation Links */}
                  <div className="lg:hidden mb-2">
                    <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                      <Link href="/gallery" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        Gallery
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                      <Link href="/images" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Images
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                      <Link href="/pngs" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        PNG&apos;s
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10 my-2" />
                  </div>
                  
                  <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                    <Link href="/profile" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                    <Link href="/downloads" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">
                      My Downloads
                    </Link>
                  </DropdownMenuItem>
                  
                  {(session.user.role === "CONTRIBUTOR" || session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN") && (
                    <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                      <Link href="/contributor" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">
                        Contributor Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {(session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN") && (
                    <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                      <Link href="/admin" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator className="bg-white/10 my-2" />
                  
                  <DropdownMenuItem className="rounded-xl hover:bg-red-500/10 focus:bg-red-500/10 transition-all duration-300 my-1 group">
                    <Link href="/api/auth/signout" className="w-full py-2 text-red-400 hover:text-red-300 font-medium transition-colors duration-300">
                      Sign out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                {/* Mobile-first auth buttons */}
                <div className="lg:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="group relative rounded-2xl px-3 py-2 h-auto hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 mt-2 rounded-2xl p-2 animate-in fade-in-80 zoom-in-95 bg-black/95 backdrop-blur-2xl border border-white/10 shadow-2xl">
                      <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                        <Link href="/gallery" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                          <Search className="w-4 h-4" />
                          Gallery
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                        <Link href="/images" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Images
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                        <Link href="/pngs" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          PNG&apos;s
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10 my-2" />
                      <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                        <Link href="/about" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">About</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                        <Link href="/pricing" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Pricing</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                        <Link href="/contact" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Contact</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10 my-2" />
                      <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all duration-300 my-1 group">
                        <Link href="/login" className="w-full py-2 text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Login</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 focus:bg-gradient-to-r focus:from-indigo-500/10 focus:to-purple-500/10 transition-all duration-300 my-1 group">
                        <Link href="/register" className="w-full py-2 text-indigo-300 font-semibold group-hover:text-white transition-colors duration-300">Sign up</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Desktop auth buttons */}
                <div className="hidden lg:flex items-center gap-3">
                  <Link href="/login">
                    <Button variant="ghost" className="font-medium text-gray-300 hover:text-white px-6 py-2.5 h-auto rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-6 py-2.5 h-auto rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105">
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 