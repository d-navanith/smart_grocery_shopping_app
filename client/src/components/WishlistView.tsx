import React from 'react';
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
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
    <div className="w-full flex-1 bg-white dark:bg-[#0D1210] pb-16">
      {/* 1. FIGMA PAGE HERO BAND */}
      <div className="w-full bg-[#F2F7F4] dark:bg-[#121A16] border-b border-[#15875D]/20 py-7">
        <div className="max-w-[1290px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-xs font-semibold text-[#1B8057] mb-1.5">
              <button onClick={onNavigateHome} className="hover:underline">
                {t.breadcrumbHome}
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <button onClick={onNavigateShop} className="hover:underline">
                {t.breadcrumbShop}
              </button>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#F96D26] font-bold">{t.wishlistTitle}</span>
            </nav>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight">
                <span className="text-[#0A6847] dark:text-white">
                  {t.wishlistTitle.split(' ')[0]}{' '}
                </span>
                <span className="text-[#F96D26]">
                  {t.wishlistTitle.split(' ').slice(1).join(' ') || 'Wishlist'}
                </span>
              </h1>
              <span className="px-3 py-0.5 rounded-full bg-[#F8C519] text-[#664E00] border border-[#C08512]/40 text-xs font-bold">
                {wishlistedProducts.length} items
              </span>
            </div>
            <p className="text-xs text-[#003D25] dark:text-zinc-400 mt-1">
              {t.wishlistSubtitle}
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={onClearWishlist}
                className="px-4 py-2.5 rounded-md border border-[#15875D] bg-white dark:bg-zinc-900 text-[#003D25] dark:text-zinc-200 hover:border-[#F96D26] hover:text-[#F96D26] text-xs font-bold transition"
              >
                {t.wishlistClearAll}
              </button>
              <button
                onClick={onMoveAllToCart}
                className="px-5 py-2.5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-xs font-medium shadow-md flex items-center gap-2 transition active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 text-[#F8C519]" />
                <span>{t.wishlistMoveAllToCart}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1290px] mx-auto px-4 sm:px-6 pt-8 space-y-12">
        {/* 2. WISHLIST CONTENT */}
        {wishlistedProducts.length === 0 ? (
          <div className="py-14 text-center rounded-xl bg-[#F0FAF3] dark:bg-zinc-900 border border-[#15875D] shadow-sm space-y-4 max-w-xl mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-white border border-[#15875D]/30 text-[#F96D26] mx-auto flex items-center justify-center shadow-xs">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#003D25] dark:text-white">
              {t.wishlistEmptyTitle}
            </h3>
            <p className="text-xs text-[#1B8057] dark:text-zinc-400 leading-relaxed">
              {t.wishlistEmptyDesc}
            </p>
            <button
              onClick={onNavigateShop}
              className="px-6 py-3 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white font-medium text-sm shadow-md transition active:scale-95 inline-flex items-center gap-2"
            >
              <span>{t.wishlistStartShopping}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => {
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;
              const discountPct = hasDiscount
                ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
                : null;

              return (
                <div
                  key={product.id}
                  className={`group rounded-lg p-5 transition-all duration-200 flex flex-col justify-between border ${
                    isDarkMode
                      ? 'bg-[#141816] border-zinc-800 hover:border-[#15875D]'
                      : 'bg-white border-transparent hover:border-[#15875D] shadow-[0_4px_14px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        {discountPct && (
                          <span className="px-2 py-0.5 rounded bg-[#F96D26] text-white text-[10px] font-bold">
                            -{discountPct}%
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-[#F0FAF3] border border-[#15875D]/30 text-[#1B8057] text-[10px] font-semibold">
                          In Stock
                        </span>
                      </div>

                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="w-8 h-8 rounded-full bg-[#F2F7F4] dark:bg-zinc-800 text-[#F96D26] hover:bg-[#F96D26] hover:text-white flex items-center justify-center transition"
                        title={t.wishlistRemoveItem}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="h-44 w-full flex items-center justify-center overflow-hidden my-2 bg-white dark:bg-zinc-900 rounded-md p-2">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  </div>

                  {/* Figma Card Footer */}
                  <div className="mt-3 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-base text-black dark:text-white line-clamp-1">
                        {product.title}
                      </h3>
                      <span className="text-base font-bold text-black dark:text-white shrink-0">
                        {product.price.toFixed(2)} lei
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded bg-[#F2F7F4] dark:bg-zinc-800 text-[#9E9E9E] text-xs font-medium">
                        {product.unitWeight || product.unit}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs line-through text-[#C7C7C7] font-medium">
                          {product.originalPrice.toFixed(2)} lei
                        </span>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#1B8057]">
                        <Star className="w-3.5 h-3.5 fill-[#F8C519] text-[#F8C519]" />
                        <span>{product.rating}</span>
                      </div>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="h-[40px] px-5 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-sm font-medium shadow-sm inline-flex items-center gap-2 transition active:scale-95"
                      >
                        <span>Add</span>
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. EXPLORE RELATED CEYLON PRODUCTS (FIGMA POPULAR PRODUCTS STYLE) */}
        {suggestedProducts.length > 0 && (
          <div className="pt-8 border-t border-[#15875D]/20 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-[28px] font-bold">
                <span className="text-[#0A6847] dark:text-white">Popular </span>
                <span className="text-[#F96D26]">Recommendations</span>
              </h2>
              <button
                onClick={onNavigateShop}
                className="text-sm font-semibold text-[#1B8057] hover:underline flex items-center gap-1"
              >
                <span>{t.viewAllProducts}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((p) => (
                <div
                  key={p.id}
                  className={`rounded-lg p-5 transition flex flex-col justify-between border ${
                    isDarkMode
                      ? 'bg-[#141816] border-zinc-800 hover:border-[#15875D]'
                      : 'bg-white border-transparent hover:border-[#15875D] shadow-[0_4px_14px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  <div className="relative">
                    <button
                      onClick={() => onToggleWishlist(p.id)}
                      className="absolute top-0 right-0 w-8 h-8 rounded-full bg-[#F2F7F4] dark:bg-zinc-800 text-[#1B8057] hover:text-[#F96D26] flex items-center justify-center transition"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <div className="h-40 flex items-center justify-center p-2">
                      <img src={p.imageUrl} alt={p.title} className="max-h-full object-contain" />
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-black dark:text-white line-clamp-1">{p.title}</h4>
                      <span className="text-sm font-bold text-black dark:text-white shrink-0">
                        {p.price.toFixed(2)} lei
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="px-2.5 py-0.5 rounded bg-[#F2F7F4] text-[#9E9E9E] text-xs font-medium">
                        {p.unitWeight || p.unit}
                      </span>
                      <button
                        onClick={() => onAddToCart(p)}
                        className="h-[36px] px-4 rounded-md bg-[#0A6847] hover:bg-[#075238] text-white text-xs font-medium inline-flex items-center gap-1.5 transition"
                      >
                        <span>Add</span>
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
