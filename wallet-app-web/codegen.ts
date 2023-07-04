
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  // All documento ended in query.graphql will be generated
  documents: "src/**/*.query.graphql",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [
        "typescript-operations",
        "typescript",
        "typescript-react-query",
        'typescript-react-apollo',
        // For server
      ]
    }
  }
};

export default config;
