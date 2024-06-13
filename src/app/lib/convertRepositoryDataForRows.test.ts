import convertRepositoryDataForRows from '@/app/lib/convertRepositoryDataForRows';

describe('convertRepositoryDataForRows', () => {
  let repositories = [
    {
      'id': 151758226,
      'node_id': 'MDEwOlJlcG9zaXRvcnkxNTE3NTgyMjY=',
      'name': 'appcenter-docs',
      'full_name': 'winnie/appcenter-docs',
      'private': false,
      'owner': {
        'login': 'winnie',
        'id': 8868628,
        'node_id': 'MDQ6VXNlcjg4Njg2Mjg=',
        'avatar_url': 'https://avatars.githubusercontent.com/u/8868628?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/winnie',
        'html_url': 'https://github.com/winnie',
        'followers_url': 'https://api.github.com/users/winnie/followers',
        'following_url': 'https://api.github.com/users/winnie/following{/other_user}',
        'gists_url': 'https://api.github.com/users/winnie/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/winnie/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/winnie/subscriptions',
        'organizations_url': 'https://api.github.com/users/winnie/orgs',
        'repos_url': 'https://api.github.com/users/winnie/repos',
        'events_url': 'https://api.github.com/users/winnie/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/winnie/received_events',
        'type': 'User',
        'site_admin': false
      },
      'html_url': 'https://github.com/winnie/appcenter-docs',
      'description': 'content repo for Visual Studio App Center on docs.microsoft.com',
      'fork': true,
      'url': 'https://api.github.com/repos/winnie/appcenter-docs',
      'forks_url': 'https://api.github.com/repos/winnie/appcenter-docs/forks',
      'keys_url': 'https://api.github.com/repos/winnie/appcenter-docs/keys{/key_id}',
      'collaborators_url': 'https://api.github.com/repos/winnie/appcenter-docs/collaborators{/collaborator}',
      'teams_url': 'https://api.github.com/repos/winnie/appcenter-docs/teams',
      'hooks_url': 'https://api.github.com/repos/winnie/appcenter-docs/hooks',
      'issue_events_url': 'https://api.github.com/repos/winnie/appcenter-docs/issues/events{/number}',
      'events_url': 'https://api.github.com/repos/winnie/appcenter-docs/events',
      'assignees_url': 'https://api.github.com/repos/winnie/appcenter-docs/assignees{/user}',
      'branches_url': 'https://api.github.com/repos/winnie/appcenter-docs/branches{/branch}',
      'tags_url': 'https://api.github.com/repos/winnie/appcenter-docs/tags',
      'blobs_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/blobs{/sha}',
      'git_tags_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/tags{/sha}',
      'git_refs_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/refs{/sha}',
      'trees_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/trees{/sha}',
      'statuses_url': 'https://api.github.com/repos/winnie/appcenter-docs/statuses/{sha}',
      'languages_url': 'https://api.github.com/repos/winnie/appcenter-docs/languages',
      'stargazers_url': 'https://api.github.com/repos/winnie/appcenter-docs/stargazers',
      'contributors_url': 'https://api.github.com/repos/winnie/appcenter-docs/contributors',
      'subscribers_url': 'https://api.github.com/repos/winnie/appcenter-docs/subscribers',
      'subscription_url': 'https://api.github.com/repos/winnie/appcenter-docs/subscription',
      'commits_url': 'https://api.github.com/repos/winnie/appcenter-docs/commits{/sha}',
      'git_commits_url': 'https://api.github.com/repos/winnie/appcenter-docs/git/commits{/sha}',
      'comments_url': 'https://api.github.com/repos/winnie/appcenter-docs/comments{/number}',
      'issue_comment_url': 'https://api.github.com/repos/winnie/appcenter-docs/issues/comments{/number}',
      'contents_url': 'https://api.github.com/repos/winnie/appcenter-docs/contents/{+path}',
      'compare_url': 'https://api.github.com/repos/winnie/appcenter-docs/compare/{base}...{head}',
      'merges_url': 'https://api.github.com/repos/winnie/appcenter-docs/merges',
      'archive_url': 'https://api.github.com/repos/winnie/appcenter-docs/{archive_format}{/ref}',
      'downloads_url': 'https://api.github.com/repos/winnie/appcenter-docs/downloads',
      'issues_url': 'https://api.github.com/repos/winnie/appcenter-docs/issues{/number}',
      'pulls_url': 'https://api.github.com/repos/winnie/appcenter-docs/pulls{/number}',
      'milestones_url': 'https://api.github.com/repos/winnie/appcenter-docs/milestones{/number}',
      'notifications_url': 'https://api.github.com/repos/winnie/appcenter-docs/notifications{?since,all,participating}',
      'labels_url': 'https://api.github.com/repos/winnie/appcenter-docs/labels{/name}',
      'releases_url': 'https://api.github.com/repos/winnie/appcenter-docs/releases{/id}',
      'deployments_url': 'https://api.github.com/repos/winnie/appcenter-docs/deployments',
      'created_at': '2018-10-05T17:50:39Z',
      'updated_at': '2018-10-05T17:50:41Z',
      'pushed_at': '2018-03-24T08:15:06Z',
      'git_url': 'git://github.com/winnie/appcenter-docs.git',
      'ssh_url': 'git@github.com:winnie/appcenter-docs.git',
      'clone_url': 'https://github.com/winnie/appcenter-docs.git',
      'svn_url': 'https://github.com/winnie/appcenter-docs',
      'homepage': 'https://docs.microsoft.com/appcenter/',
      'size': 132707,
      'stargazers_count': 0,
      'watchers_count': 0,
      'language': 'PowerShell',
      'has_issues': false,
      'has_projects': true,
      'has_downloads': true,
      'has_wiki': true,
      'has_pages': false,
      'has_discussions': false,
      'forks_count': 0,
      'mirror_url': null,
      'archived': false,
      'disabled': false,
      'open_issues_count': 0,
      'license': {
        'key': 'cc-by-4.0',
        'name': 'Creative Commons Attribution 4.0 International',
        'spdx_id': 'CC-BY-4.0',
        'url': 'https://api.github.com/licenses/cc-by-4.0',
        'node_id': 'MDc6TGljZW5zZTI1'
      },
      'allow_forking': true,
      'is_template': false,
      'web_commit_signoff_required': false,
      'topics': [],
      'visibility': 'public',
      'forks': 0,
      'open_issues': 0,
      'watchers': 0,
      'default_branch': 'live'
    }
  ]
  let result: any
  beforeEach(() => {
    result = convertRepositoryDataForRows(repositories)
  });

  it('should return formatted rows for the repositories', () => {
    expect(result).toEqual([
      {
        "created": "10/05/2018",
        "full_name": "winnie/appcenter-docs",
        "id": 151758226,
        "pushed": "03/24/2018",
        "updated": "10/05/2018"
      }
    ])
  });
});
