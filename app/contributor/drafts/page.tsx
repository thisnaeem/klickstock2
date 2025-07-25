import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { DraftsList } from "@/components/contributor/DraftsList";
import { ContributorItemStatus } from "@prisma/client";

export default async function DraftsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  // Fetch only draft items for this user
  const draftItems = await db.contributorItem.findMany({
    where: { 
      userId: session.user.id,
      status: ContributorItemStatus.DRAFT
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      createdAt: true,
      tags: true,
      category: true
    }
  });

  return (
    <div className="space-y-6 min-h-screen pb-10">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-indigo-900/40 p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Draft Content</h1>
        <p className="text-gray-300">
          Content you&apos;ve uploaded but not yet submitted for review
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-gray-900/50 border border-gray-800/40 p-6 rounded-lg shadow-lg">
        {draftItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-indigo-900/30 text-indigo-400 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-200 mb-2">No Drafts Yet</h3>
            <p className="text-gray-400 mb-6 max-w-md">You haven&apos;t saved any drafts yet. Start creating content and save your work here.</p>
            <a 
              href="/contributor/upload" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
            >
              Upload Images
            </a>
          </div>
        ) : (
          <DraftsList items={draftItems} />
        )}
      </div>
    </div>
  );
} 