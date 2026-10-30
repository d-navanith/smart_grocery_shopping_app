import React from 'react';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  CheckCircle,
  ChevronRight,
  Star
} from 'lucide-react';
import { Product } from '../types';
import { TranslationDictionary } from '../translations';

interface WishlistViewProps {
  wishlistIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number, selectedWeight?: string) => void;
  onMoveAllToCart: () => void;
  onClearWishlist: () => void;
  onNavigateShop: () => void;
  onNavigateHome: () => void;
  isDarkMode: boolean;
  t: TranslationDictionary;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistIds,
  products,
  onToggleWishlist,
  onAddToCart,
  onMoveAllToCart,
  onClearWishlist,
  onNavigateShop,
  onNavigateHome,
  isDarkMode,
  t
}) => {
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));
  const suggestedProducts = products.filter(p => !wishlistIds.includes(p.id)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      {/* 1. BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-bold text-slate-400">
        <button onClick={onNavigateHome} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
          {t.breadcrumbHome}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={onNavigateShop} className="hover:text-[#0A6847] dark:hover:text-[#78F9B8] transition">
          {t.breadcrumbShop}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-white font-extrabold">{t.wishlistTitle}</span>
      </nav>

      {/* 2. PAGE HEADER WITH FIGMA/BEHANCE AESTHETIC */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-rose-900/20">
            ❤️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {t.wishlistTitle}
              </h1>
              <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black">
                {wishlistedProducts.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              {t.wishlistSubtitle}
            </p>
          </div>
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={onClearWishlist}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 hover:text-red-600 hover:border-red-300 text-xs font-black transition active:scale-95"
            >
              {t.wishlistClearAll}
            </button>
            <button
              onClick={onMoveAllToCart}
              className="px-5 py-2.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow-md flex items-center gap-2 transition active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFB800]" />
              <span>{t.wishlistMoveAllToCart}</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. WISHLIST CONTENT */}
      {wishlistedProducts.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4 max-w-xl mx-auto p-8">
          <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 mx-auto flex items-center justify-center text-4xl shadow-inner">
            🤍
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {t.wishlistEmptyTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            {t.wishlistEmptyDesc}
          </p>
          <button
            onClick={onNavigateShop}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#E5A91A] to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-xs shadow-md transition active:scale-95 inline-flex items-center gap-2"
          >
            <span>{t.wishlistStartShopping}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            const discountPct = hasDiscount
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
              : null;

            return (
              <div
                key={product.id}
                className="group rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-[#0A6847] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Badges & Remove Button */}
                <div className="relative p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {discountPct && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black shadow-xs">
                          {discountPct}% OFF
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-[#E5A91A] text-amber-950 text-[10px] font-black uppercase tracking-wider">
                        Ceylon Export
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition shadow-2xs"
                      title={t.wishlistRemoveItem}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="h-44 w-full flex items-center justify-center overflow-hidden my-3">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                    />
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 pt-0 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="uppercase font-bold tracking-wider">{product.category}</span>
                      <div className="flex items-center gap-1 font-black text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-black text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug">
                      {product.title}
                    </h3>

                    {/* Stock Status */}
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{t.wishlistInStock}</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                          {product.price.toFixed(2)}
                        </span>
                        <span className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8]">lei</span>
                      </div>
                      {product.originalPrice && (
                        <span className="text-[11px] line-through text-slate-400">
                          {product.originalPrice.toFixed(2)} lei
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2.5 rounded-xl bg-[#0A6847] hover:bg-[#085237] text-white text-xs font-black shadow-md flex items-center gap-1.5 transition active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{t.wishlistAddToCart}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. EXPLORE RELATED CEYLON PRODUCTS (FIGMA/BEHANCE SPEC) */}
      {suggestedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0A6847] dark:text-[#78F9B8] block">
                {t.wishlistRelatedSubtitle}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t.wishlistRelatedTitle}
              </h2>
            </div>
            <button
              onClick={onNavigateShop}
              className="text-xs font-black text-[#0A6847] dark:text-[#78F9B8] hover:underline flex items-center gap-1"
            >
              <span>{t.viewAllProducts}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {suggestedProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:shadow-lg transition space-y-3 flex flex-col justify-between"
              >
                <div className="relative">
                  <button
                    onClick={() => onToggleWishlist(p.id)}
                    className="absolute top-0 right-0 p-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 hover:text-red-500 transition"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <img src={p.imageUrl} alt={p.title} className="h-28 mx-auto object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-black line-clamp-1">{p.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-black text-[#0A6847] dark:text-[#78F9B8]">
                      {p.price.toFixed(2)} lei
                    </span>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-[#0A6847] hover:bg-[#0A6847] hover:text-white transition"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
