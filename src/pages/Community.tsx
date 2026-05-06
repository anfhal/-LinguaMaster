import { useState } from 'react';
import { MessageCircle, Heart, Share2, Users, Search, Plus, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { Language } from '../types';

export default function Community() {
  const { forumPosts, studyGroups } = useAppStore();
  const [activeTab, setActiveTab] = useState<'forum' | 'groups'>('forum');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const languageFlags: Record<string, string> = {
    en: '🇺🇸',
    ja: '🇯🇵',
    ko: '🇰🇷',
  };

  const filteredPosts = forumPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = studyGroups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Community</h1>
          <p className="text-gray-500">Connect with fellow language learners</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'forum'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Forum
            </span>
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'groups'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Study Groups
            </span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            {activeTab === 'forum' ? 'Create Post' : 'Create Group'}
          </button>
        </div>

        {activeTab === 'forum' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="card">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId}`}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{post.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="badge badge-primary">{languageFlags[post.language]}</span>
                      <span>{post.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likesCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {post.commentsCount}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 hover:text-primary-600 cursor-pointer">
                    <Share2 className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {!selectedGroup ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group) => (
                  <div
                    key={group.id}
                    className="card cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setSelectedGroup(group.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-gray-800">{group.name}</h3>
                      <span className="badge badge-primary">{languageFlags[group.language]}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{group.memberCount} members</span>
                      </div>
                      <button className="btn-secondary text-sm">Join</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Groups
                </button>
                
                {studyGroups.find((g) => g.id === selectedGroup) && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {studyGroups.find((g) => g.id === selectedGroup)?.name}
                      </h2>
                      <span className="badge badge-primary">
                        {languageFlags[studyGroups.find((g) => g.id === selectedGroup)?.language || 'en']}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {studyGroups.find((g) => g.id === selectedGroup)?.description}
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Users className="w-5 h-5" />
                        <span>{studyGroups.find((g) => g.id === selectedGroup)?.memberCount} members</span>
                      </div>
                      <span className="text-gray-500">
                        Created {studyGroups.find((g) => g.id === selectedGroup)?.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <button className="btn-primary">Join Group</button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === 'forum' && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts found</h3>
            <p className="text-gray-500">Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  );
}
