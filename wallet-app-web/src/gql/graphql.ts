/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Balance = {
  __typename?: 'Balance';
  /** Amount of money */
  amount: Scalars['Float']['output'];
  /** When this balance was created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier */
  id: Scalars['String']['output'];
  /** Is this balance deleted? */
  isDeleted: Scalars['Boolean']['output'];
  /** When this balance was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User relation */
  user: User;
};

export type CreateBalanceInput = {
  /** Balance amount total */
  amount: Scalars['Float']['input'];
  /** When this balance was created */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Unique identifier */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Is this balance deleted? */
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  /** When this balance was last updated */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** User id */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type FilterBalanceInput = {
  /** Balance amount total */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** Balance amount total (from) */
  amountFrom?: InputMaybe<Scalars['Float']['input']>;
  /** When this balance was created */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Balance created at (from) */
  createdAtFrom?: InputMaybe<Scalars['DateTime']['input']>;
  /** Unique identifier */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Is this balance deleted? */
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  /** When this balance was last updated */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** User id */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBalance: Balance;
  removeBalance: Balance;
  updateBalance: Balance;
};


export type MutationCreateBalanceArgs = {
  createBalanceInput: CreateBalanceInput;
};


export type MutationRemoveBalanceArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateBalanceArgs = {
  updateBalanceInput: UpdateBalanceInput;
};

export type PaginationDto = {
  /** Page number */
  page?: InputMaybe<Scalars['Float']['input']>;
  /** Records By Page */
  recordsByPage?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  balance: Balance;
  balances: ResponsePaginationBalanceDto;
};


export type QueryBalanceArgs = {
  id: Scalars['String']['input'];
};


export type QueryBalancesArgs = {
  filter?: InputMaybe<FilterBalanceInput>;
  pagination?: InputMaybe<PaginationDto>;
};

export type ResponsePaginationBalanceDto = {
  __typename?: 'ResponsePaginationBalanceDto';
  /** Total records */
  data?: Maybe<Array<Balance>>;
  /** Page number */
  page?: Maybe<Scalars['Float']['output']>;
  /** Records By Page */
  recordsByPage?: Maybe<Scalars['Float']['output']>;
  /** Total pages */
  totalPages?: Maybe<Scalars['Float']['output']>;
  /** Total records */
  totalRecords?: Maybe<Scalars['Float']['output']>;
};

export type UpdateBalanceInput = {
  /** Balance amount total */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** When this balance was created */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  /** Is this balance deleted? */
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  /** When this balance was last updated */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** User id */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Is this user active? */
  active: Scalars['Boolean']['output'];
  /** User balances */
  balances: Array<Balance>;
  /** User email */
  email: Scalars['String']['output'];
  /** User full name */
  fullName: Scalars['String']['output'];
  /** User unique identifier */
  id: Scalars['String']['output'];
  /** User password */
  password: Scalars['String']['output'];
};

export type GetBalancesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBalancesQuery = { __typename?: 'Query', balances: { __typename?: 'ResponsePaginationBalanceDto', totalRecords?: number | null, totalPages?: number | null, page?: number | null, recordsByPage?: number | null, data?: Array<{ __typename?: 'Balance', id: string, isDeleted: boolean, createdAt: any, updatedAt?: any | null, amount: number }> | null } };


export const GetBalancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBalances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalRecords"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"recordsByPage"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<GetBalancesQuery, GetBalancesQueryVariables>;
export type GetBalancesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBalancesQuery = { __typename?: 'Query', balances: { __typename?: 'ResponsePaginationBalanceDto', totalRecords?: number | null, totalPages?: number | null, page?: number | null, recordsByPage?: number | null, data?: Array<{ __typename?: 'Balance', id: string, isDeleted: boolean, createdAt: any, updatedAt?: any | null, amount: number }> | null } };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Balance = {
  __typename?: 'Balance';
  /** Amount of money */
  amount: Scalars['Float']['output'];
  /** When this balance was created */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier */
  id: Scalars['String']['output'];
  /** Is this balance deleted? */
  isDeleted: Scalars['Boolean']['output'];
  /** When this balance was last updated */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User relation */
  user: User;
};

export type CreateBalanceInput = {
  /** Balance amount total */
  amount: Scalars['Float']['input'];
  /** When this balance was created */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Unique identifier */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Is this balance deleted? */
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  /** When this balance was last updated */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** User id */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type FilterBalanceInput = {
  /** Balance amount total */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** Balance amount total (from) */
  amountFrom?: InputMaybe<Scalars['Float']['input']>;
  /** When this balance was created */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Balance created at (from) */
  createdAtFrom?: InputMaybe<Scalars['DateTime']['input']>;
  /** Unique identifier */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Is this balance deleted? */
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  /** When this balance was last updated */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** User id */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBalance: Balance;
  removeBalance: Balance;
  updateBalance: Balance;
};


export type MutationCreateBalanceArgs = {
  createBalanceInput: CreateBalanceInput;
};


export type MutationRemoveBalanceArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateBalanceArgs = {
  updateBalanceInput: UpdateBalanceInput;
};

export type PaginationDto = {
  /** Page number */
  page?: InputMaybe<Scalars['Float']['input']>;
  /** Records By Page */
  recordsByPage?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  balance: Balance;
  balances: ResponsePaginationBalanceDto;
};


export type QueryBalanceArgs = {
  id: Scalars['String']['input'];
};


export type QueryBalancesArgs = {
  filter?: InputMaybe<FilterBalanceInput>;
  pagination?: InputMaybe<PaginationDto>;
};

export type ResponsePaginationBalanceDto = {
  __typename?: 'ResponsePaginationBalanceDto';
  /** Total records */
  data?: Maybe<Array<Balance>>;
  /** Page number */
  page?: Maybe<Scalars['Float']['output']>;
  /** Records By Page */
  recordsByPage?: Maybe<Scalars['Float']['output']>;
  /** Total pages */
  totalPages?: Maybe<Scalars['Float']['output']>;
  /** Total records */
  totalRecords?: Maybe<Scalars['Float']['output']>;
};

export type UpdateBalanceInput = {
  /** Balance amount total */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** When this balance was created */
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  /** Is this balance deleted? */
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  /** When this balance was last updated */
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  /** User id */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** Is this user active? */
  active: Scalars['Boolean']['output'];
  /** User balances */
  balances: Array<Balance>;
  /** User email */
  email: Scalars['String']['output'];
  /** User full name */
  fullName: Scalars['String']['output'];
  /** User unique identifier */
  id: Scalars['String']['output'];
  /** User password */
  password: Scalars['String']['output'];
};


export const GetBalancesDocument = `
    query GetBalances {
  balances {
    totalRecords
    totalPages
    page
    recordsByPage
    data {
      id
      isDeleted
      createdAt
      updatedAt
      amount
    }
  }
}
    `;
export const useGetBalancesQuery = <
      TData = GetBalancesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetBalancesQueryVariables,
      options?: UseQueryOptions<GetBalancesQuery, TError, TData>
    ) =>
    useQuery<GetBalancesQuery, TError, TData>(
      variables === undefined ? ['GetBalances'] : ['GetBalances', variables],
      fetcher<GetBalancesQuery, GetBalancesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetBalancesDocument, variables),
      options
    );

export const GetBalancesDocument = gql`
    query GetBalances {
  balances {
    totalRecords
    totalPages
    page
    recordsByPage
    data {
      id
      isDeleted
      createdAt
      updatedAt
      amount
    }
  }
}
    `;

/**
 * __useGetBalancesQuery__
 *
 * To run a query within a React component, call `useGetBalancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalancesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBalancesQuery(baseOptions?: Apollo.QueryHookOptions<GetBalancesQuery, GetBalancesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBalancesQuery, GetBalancesQueryVariables>(GetBalancesDocument, options);
      }
export function useGetBalancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBalancesQuery, GetBalancesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBalancesQuery, GetBalancesQueryVariables>(GetBalancesDocument, options);
        }
export type GetBalancesQueryHookResult = ReturnType<typeof useGetBalancesQuery>;
export type GetBalancesLazyQueryHookResult = ReturnType<typeof useGetBalancesLazyQuery>;
export type GetBalancesQueryResult = Apollo.QueryResult<GetBalancesQuery, GetBalancesQueryVariables>;