import React from 'react';

import { Home } from '../pages/home/Home';
import { RootLayout } from '../layouts/RootLayout';
import { NotFound } from '../pages/not-found/NotFound';
import { SearchResult } from '../pages/search-result/SearchResult';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />
      <Route path='result' element={<SearchResult />} />
    </Route>,
  ),
);
