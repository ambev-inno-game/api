# :department_store: Assina Ambev

BATATA

## :pushpin: Summary

- [:department_store: Assina Ambev](#department_store-assina-ambev)
  - [:pushpin: Summary](#pushpin-summary)
  - [:ocean: Gitflow](#ocean-gitflow)
    - [- Naming branches](#ullinaming-branchesliul)
    - [- Commiting](#ullicommitingliul)
    - [- Openning pull requests](#ulliopenning-pull-requestsliul)
  - [:computer: Mantainers](#computer-mantainers)

## :ocean: Gitflow

This section explains how to name branhces, commit and open pull requests in the right way, in agreement with our repository rules.

### - Naming branches

Assuming that you are in the develop branch you can create a new branch to start your work, the name of your branch depend on what type of work are you doing.

- _enhancement_. If you need to do something that isn't a new feature or a bug fix and isn't already implemented your branch should start with _enhancement_.

  ```
    enhancement/name-example
  ```

- _feat_. If you are going to work on a new feature your brnahc show start with _feat_.

  ```
    feat/name-example
  ```

- _fix_. If your are going to work on a bug fix, your branch should start with _fix_.

  ```
    fix/name-example
  ```

- _refactor_. If you are working on a code refactor that will affect things like response time or code organization, your branch should start with _refactor_. It is like an enhancement but of something already implemented.

  ```
    refactor/name-example
  ```

### - Commiting

You should `commit` periodicly during the development. Your `commits` need to start with the actual branch name, with the prefix (enhancement, feat, fix or refactor) followed by a short description of what you are commiting.

- Example of a commit in the `feat/name-example` branch:

  ```
    feat/name-example: creating a new feature
  ```

### - Openning pull requests

After finishing your work you are able to open a pull request. You need to follow some rules to open a pull request.

- Title: The pull request title needs to be exactly equals to your branch name.

- Description: You need to fill all the fields of our pull resquest template.

- Reviewers: Select at least one reviewer.

- Assgnees: Assignee the pull request to yourself or to all that helped work on it.

- Labels: Add the right lebels, it depends on your branch name, each one have his corespondent label on our repository.

## :computer: Mantainers

- [Emilio Heinzmann](https://github.com/emilioheinz)
- [Rhian Lopes](https://github.com/RhianLopes)
- [Victor Comette](https://github.com/Comette)

