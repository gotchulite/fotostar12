import { Route, Routes } from 'react-router-dom';
import { FocusLayout, SiteLayout } from '@/components/layout/Layouts';
import { CartProvider } from '@/features/cart/store';
import { DraftProvider } from '@/features/design-draft/store';
import { LocaleProvider } from '@/hooks/useLocale';

import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Services from '@/pages/Services';
import HowItWorksPage from '@/pages/HowItWorksPage';
import Future from '@/pages/Future';
import Account from '@/pages/Account';
import Cart from '@/pages/Cart';
import NotFound from '@/pages/NotFound';
import SendStart from '@/pages/send/SendStart';
import Track from '@/pages/orders/Track';

import CreateStart from '@/pages/create/CreateStart';
import Upload from '@/pages/create/Upload';
import Editor from '@/pages/create/Editor';
import Collage from '@/pages/create/Collage';
import Frame from '@/pages/create/Frame';
import Message from '@/pages/create/Message';
import Recipient from '@/pages/create/Recipient';
import Delivery from '@/pages/create/Delivery';
import Review from '@/pages/create/Review';

import Checkout from '@/pages/orders/Checkout';
import Confirmation from '@/pages/orders/Confirmation';
import OrderTracking from '@/pages/orders/OrderTracking';

/**
 * Route map. Pages only compose components; the shared design draft and the cart live in
 * providers so the editor, preview, cart and saved designs read the same state.
 *
 *   SiteLayout   marketing and browsing: full header and footer
 *   FocusLayout  creation, checkout and tracking: a quiet header so the customer stays focused
 */
export function App() {
  return (
    <LocaleProvider>
      <DraftProvider>
        <CartProvider>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:slug" element={<ProductDetail />} />
              <Route path="create" element={<CreateStart />} />
              <Route path="send" element={<SendStart />} />
              <Route path="services" element={<Services />} />
              <Route path="how-it-works" element={<HowItWorksPage />} />
              <Route path="future" element={<Future />} />
              <Route path="account" element={<Account />} />
              <Route path="cart" element={<Cart />} />
              <Route path="track" element={<Track />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="create" element={<FocusLayout />}>
              <Route path="upload" element={<Upload />} />
              <Route path="editor" element={<Editor />} />
              <Route path="collage" element={<Collage />} />
              <Route path="frame" element={<Frame />} />
              <Route path="message" element={<Message />} />
              <Route path="recipient" element={<Recipient />} />
              <Route path="delivery" element={<Delivery />} />
              <Route path="review" element={<Review />} />
            </Route>

            <Route element={<FocusLayout stepper={false} />}>
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders/:id" element={<Confirmation />} />
              <Route path="track/:id" element={<OrderTracking />} />
            </Route>
          </Routes>
        </CartProvider>
      </DraftProvider>
    </LocaleProvider>
  );
}
