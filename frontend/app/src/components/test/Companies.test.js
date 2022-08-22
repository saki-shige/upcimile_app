import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom'
import { unmountComponentAtNode } from "react-dom";

import { render, screen } from '@testing-library/react';

import Companies from '../pages/Companies';
import { handleGetCompanies } from '../functionals/companies';
import * as companiesUsecase from '../functionals/companies';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Companies', () => {
  const res = [{ name: 'test1', id: 1, email: 'test1@email.com' },{ name: 'test2', id: 2, email: 'test1@email.com' }];
  const spy = jest.spyOn(companiesUsecase, 'handleGetCompanies').mockResolvedValue(res);

  it('取得した企業情報をすべて表示する', async () => {
    await act(async() => {
      render(<BrowserRouter><Companies /></BrowserRouter>, container);
    });
    const listElements = screen.getAllByTestId('companies');
    expect(handleGetCompanies).toHaveBeenCalled();
    expect(listElements).toHaveLength(res.length);
  });
  it('各企業のページにアクセスできる', async () => {
    await act(async() => {
      render(<BrowserRouter><Companies /></BrowserRouter>);
    });
    expect(screen.getByTestId('companies_0')).toHaveAttribute('href', `/companies/${res[0].id}`);
  });
}
)
